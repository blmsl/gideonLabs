


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

