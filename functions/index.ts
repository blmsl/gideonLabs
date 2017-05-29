import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
//import * as nodemailer from 'nodemailer';

import * as _storage from '@google-cloud/storage';
import { spawn } from 'child-process-promise';
//import * as mkdirp from 'mkdirp-promise';

admin.initializeApp(functions.config().firebase);
const bucket = _storage().bucket(functions.config().firebase.storageBucket);
const projectId = 'gideonlabs-b4b71';

exports.resizeImage = functions.storage.object().onChange(async event => {

  const thumbPrefix = 'thumb_';
  const path = event.data.name;
  const [storyPath, storySlug, pictureSlug, fileName] = path.split('/');
  
  // Exit if this is triggered on a file that is not an image.
  if (!event.data.contentType.startsWith('image/')) return;
  
  // Exit if the image is already a thumbnail.
  if (fileName.startsWith(thumbPrefix)) return;

  // Exit if this is a move or deletion event.
  if (event.data.resourceState === 'not_exists') return;

  const tmpFilePath = `/tmp/${pictureSlug}.jpg`;
  const file = bucket.file(path);
  await file.download({ destination: tmpFilePath });

  await spawn('convert', [tmpFilePath, '-thumbnail', '300x300>', tmpFilePath]);

  const destination = `${storyPath}/${storySlug}/${pictureSlug}/thumb_${pictureSlug}.jpg`;

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
