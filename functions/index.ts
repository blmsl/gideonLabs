import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

import * as _storage from '@google-cloud/storage';
import { spawn } from 'child-process-promise';

import * as imagemin from 'imagemin';
import * as imageminWebp from 'imagemin-webp';

admin.initializeApp(functions.config().firebase);
const bucket = _storage().bucket(functions.config().firebase.storageBucket);
const projectId = 'gideonlabs-b4b71';

const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
const LOCAL_TMP_FOLDER = '/tmp/';
const thumbPrefix = 'thumb_';

exports.sendContactMessage = functions.database.ref('/messages/{pushKey}').onWrite(async event => {

  const snapshot = event.data;

  // Only send email for new messages.
  if (snapshot.previous.val() || !snapshot.val().name) return;

  const val = snapshot.val();

  const mailOptions = {
    to: 'markgoho@gmail.com',
    subject: `Information Request from ${val.name}`,
    html: val.html
  };

  await mailTransport.sendMail(mailOptions);
  console.log('Mail sent to: markgoho@gmail.com');
});

exports.resizeImage = functions.storage.object().onChange(async event => {  
  const maxThumbHeight = 300;
  const maxThumbWidth = 300;
  const path = event.data.name;
  const [storyPath, storySlug, pictureSlug, fileName] = path.split('/');
  const fileType = fileName.split('.')[1];

  // Exit if the image is already in the WebP format.
  if (fileName.endsWith('.webp')) return;
  
  // Exit if this is triggered on a file that is not an image.
  if (!event.data.contentType.startsWith('image/')) return;
  
  // Exit if the image is already a thumbnail.
  if (fileName.startsWith(thumbPrefix)) return;

  // Exit if this is a move or deletion event.
  if (event.data.resourceState === 'not_exists') return;

  const tmpFilePath = `${LOCAL_TMP_FOLDER}${pictureSlug}.${fileType}`;
  const file = bucket.file(path);
  await file.download({ destination: tmpFilePath });

  await spawn('convert', [tmpFilePath, '-thumbnail', `${maxThumbHeight}x${maxThumbWidth}>`, tmpFilePath]);

  const destination = `${storyPath}/${storySlug}/${pictureSlug}/thumb_${pictureSlug}.${fileType}`;
  console.log('Tmpfilepath:', tmpFilePath);
  await bucket.upload(tmpFilePath, { 
    destination,
  }, (err, file) => {
    if (err) return console.error(err);
    file.makePublic();
  });

  // Contruct storage url: https://github.com/firebase/functions-samples/issues/123
  const storageURL = `https://storage.googleapis.com/${projectId}.appspot.com/${destination}`;

  await admin.database().ref(`/pictures/${pictureSlug}/thumbnail`).set({ storageURL });
});

exports.convertToWebP = functions.storage.object().onChange(async event => {
  // Exit if this is triggered on a file that is not an image.
  if (!event.data.contentType.startsWith('image/')) return;
    
  // Exit if this is a move or deletion event.
  if (event.data.resourceState === 'not_exists') return;

  const path = event.data.name;
  const [storyPath, storySlug, pictureSlug, fileName] = path.split('/');

  // Exit if the image is already in the WebP format.
  if (fileName.endsWith('.webp')) return;

  // Use the Buffer to download, convert, and upload the image
  // https://github.com/tuelsch/bolg/blob/master/functions/index.js
  // Download file
  const file = bucket.file(path);
  const downloadBuffer = await file.download();

  // Convert file
  const buffer = await imagemin.buffer(Buffer.concat(downloadBuffer), { plugins: [ imageminWebp({quality: 50})] });

  // Upload file
  let destination = `${storyPath}/${storySlug}/${pictureSlug}.webp`;
  if (fileName.startsWith(thumbPrefix)) {
    destination = `${storyPath}/${storySlug}/thumb_${pictureSlug}.webp`
  }
  console.log(`Uploading ${pictureSlug}.webp to destination`);
  const newBucketFile = bucket.file(destination);
  await newBucketFile.save(buffer, {
    metadata: {
      contentType: 'image/webp'
    },
    public: true,
    private: false,
    resumable: false
  });

  // Contruct storage url: https://github.com/firebase/functions-samples/issues/123
  const storageURL = `https://storage.googleapis.com/${projectId}.appspot.com/${destination}`;

  if (fileName.startsWith(thumbPrefix)) {
    await admin.database().ref(`/pictures/${pictureSlug}/thumbnail`).update({ webp: storageURL });
  } else {
    await admin.database().ref(`/pictures/${pictureSlug}/original`).update({ webp: storageURL });
  }
  
});