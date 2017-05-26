const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const gcs = require('@google-cloud/storage')();
const exec = require('child-process-promise').exec;
const spawn = require('child-process-promise').spawn;
const mkdirp = require('mkdirp-promise');

const localTempFolder = `/tmp/`;
const thumbMaxHeight = 200;
const thumbMaxWidth = 200;
const thumbPrefix = 'thumb_';

admin.initializeApp(functions.config().firebase);

const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

exports.sendContactMessage = functions.database.ref('/messages/{pushKey}').onWrite(event => {

  const snapshot = event.data;

  // Only send email for new messages.
  if (snapshot.previous.val() || !snapshot.val().name) {
    return;
  }

  const val = snapshot.val();

  const mailOptions = {
    to: 'markgoho@gmail.com',
    subject: `Information Request from ${val.name}`,
    html: val.html
  };

  return mailTransport.sendMail(mailOptions).then(() => console.log('Mail sent to: markgoho@gmail.com'));
});

exports.metadata = functions.storage.object().onChange(event => {
  const object = event.data;
  const filePath = object.name;
  const [storyPath, storySlug, pictureSlug, fileName] = filePath.split('/');
  const tempLocalFile = `${localTempFolder}${fileName}`;

  // Exit if this is triggered on a file that is not an image
  if (!object.contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return;
  }

  // Exit if this is a move or deletion event
  if (object.resourceState === 'not_exists') {
    console.log('This is a deletion event.')
    return;
  }

  // Download file from bucket
  const bucket = gcs.bucket(object.bucket);
  return bucket.file(filePath).download({
    destination: tempLocalFile
  }).then(() => {
    // Get metadata from image
    return exec(`identify "${tempLocalFile}"`).then(result => {
      const resolution = result.stdout.split(' ')[2];
      //const metadata = imageMagickOutputToObject(result.stdout);
      // Save metadata to realtime database
      return admin.database().ref(`/pictures/${pictureSlug}/original/resolution`).set(resolution).then(() => {
        console.log(`Resolution written to: /pictures/${pictureSlug}/original/resolution: ${resolution}`);
      });
    });
  });

  // Convert the output of ImageMagick's `identify -verbose` command to a JavaScript Object.
  function imageMagickOutputToObject(output) {
    let previousLineIndent = 0;
    const lines = output.match(/[^\r\n]+/g);
    lines.shift(); // Remove First line
    lines.forEach((line, index) => {
      const currentIdent = line.search(/\S/);
      line = line.trim();
      if (line.endsWith(':')) {
        lines[index] = makeKeyFirebaseCompatible(`"${line.replace(':', '":{')}`);
      } else {
        const split = line.replace('"', '\\"').split(': ');
        split[0] = makeKeyFirebaseCompatible(split[0]);
        lines[index] = `"${split.join('":"')}",`;
      }
      if (currentIdent < previousLineIndent) {
        lines[index - 1] = lines[index - 1].substring(0, lines[index - 1].length - 1);
        lines[index] = new Array(1 + (previousLineIndent - currentIdent) / 2).join('}') + ',' + lines[index];
      }
      previousLineIndent = currentIdent;
    });
    output = lines.join('');
    output = '{' + output.substring(0, output.length - 1) + '}'; // remove trailing comma.
    output = JSON.parse(output);
    console.log('Metadata extracted from image', output);
    return output;
  }

  function makeKeyFirebaseCompatible(key) {
    return key.replace(/\./g, '*');
  }

});

exports.generateThumbnail = functions.storage.object().onChange(event => {
  const filePath = event.data.name;
  const filePathSplit = filePath.split('/');
  const storySlug = filePathSplit[1];
  const pictureSlug = filePathSplit[2];
  const fileName = filePathSplit.pop();
  const fileDir = filePathSplit.join('/') + (filePathSplit.length > 0 ? '/' : '');
  const thumbFilePath = `${fileDir}${thumbPrefix}${fileName}`;
  const tempLocalDir = `${localTempFolder}${fileDir}`;
  const tempLocalFile = `${tempLocalDir}${fileName}`;
  const tempLocalThumbFile = `${localTempFolder}${thumbFilePath}`;

  // Exit if this is triggered on a file that is not an image.
  if (!event.data.contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return;
  }

  // Exit if the image is already a thumbnail.
  if (fileName.startsWith(thumbPrefix)) {
    console.log('Already a Thumbnail.');
    return;
  }

  // Exit if this is a move or deletion event.
  if (event.data.resourceState === 'not_exists') {
    console.log('This is a deletion event.');
    return;
  }

  // Create the temp directory where the storage file will be downloaded.
  return mkdirp(tempLocalDir).then(() => {
    // Download file from bucket.
    const bucket = gcs.bucket(event.data.bucket);
    return bucket.file(filePath).download({
      destination: tempLocalFile
    }).then(() => {
      console.log('The file has been downloaded to', tempLocalFile);
      // Generate a thumbnail using ImageMagick.
      return spawn('convert', [tempLocalFile, '-thumbnail', `${thumbMaxWidth}x${thumbMaxHeight}>`, tempLocalThumbFile]).then(() => {
        console.log('Thumbnail created at', tempLocalThumbFile);
        // Uploading the Thumbnail.
        return bucket.upload(tempLocalThumbFile, {
          destination: thumbFilePath
        }).then(() => {
          console.log('Thumbnail uploaded to Storage at', thumbFilePath);
          const downloadPath = `gs://${thumbFilePath}`;
          return admin.database().ref(`/pictures/${pictureSlug}/thumb/storageURL`).set(downloadPath);
        });
      });
    });
  });
});
