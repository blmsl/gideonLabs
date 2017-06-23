"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const _storage = require("@google-cloud/storage");
const child_process_promise_1 = require("child-process-promise");
const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");
admin.initializeApp(functions.config().firebase);
const bucket = _storage().bucket(functions.config().firebase.storageBucket);
const projectId = 'gideonlabs-b4b71';
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
const LOCAL_TMP_FOLDER = '/tmp/';
const thumbPrefix = 'thumb_';
exports.sendContactMessage = functions.database
    .ref('/messages/{pushKey}')
    .onWrite((event) => __awaiter(this, void 0, void 0, function* () {
    const snapshot = event.data;
    // Only send email for new messages.
    if (snapshot.previous.val() || !snapshot.val().name)
        return;
    const val = snapshot.val();
    const mailOptions = {
        to: 'markgoho@gmail.com',
        subject: `Information Request from ${val.name}`,
        html: val.html
    };
    yield mailTransport.sendMail(mailOptions);
    console.log('Mail sent to: markgoho@gmail.com');
}));
exports.resizeImage = functions.storage.object().onChange((event) => __awaiter(this, void 0, void 0, function* () {
    const maxThumbHeight = 300;
    const maxThumbWidth = 300;
    const path = event.data.name;
    const [storyPath, storyKey, pictureKey, fileName] = path.split('/');
    const [pictureSlug, fileType] = fileName.split('.');
    // Exit if the image is already in the WebP format.
    if (fileName.endsWith('.webp'))
        return;
    // Exit if this is triggered on a file that is not an image.
    if (!event.data.contentType.startsWith('image/'))
        return;
    // Exit if the image is already a thumbnail.
    if (fileName.startsWith(thumbPrefix))
        return;
    // Exit if this is a move or deletion event.
    if (event.data.resourceState === 'not_exists')
        return;
    const tmpFilePath = `${LOCAL_TMP_FOLDER}${pictureSlug}.${fileType}`;
    const file = bucket.file(path);
    yield file.download({ destination: tmpFilePath });
    yield child_process_promise_1.spawn('convert', [
        tmpFilePath,
        '-thumbnail',
        `${maxThumbHeight}x${maxThumbWidth}>`,
        tmpFilePath
    ]);
    const destination = `${storyPath}/${storyKey}/${pictureKey}/thumb_${pictureSlug}.${fileType}`;
    yield bucket.upload(tmpFilePath, {
        destination
    }, (err, file) => {
        if (err)
            return console.error(err);
        file.makePublic();
    });
    // Contruct storage url: https://github.com/firebase/functions-samples/issues/123
    const storageURL = `https://storage.googleapis.com/${projectId}.appspot.com/${destination}`;
    yield admin
        .database()
        .ref(`/pictures/${pictureKey}/thumbnail`)
        .set({ storageURL });
    return yield admin
        .database()
        .ref(`/storyPictures/${storyKey}/${pictureKey}/thumbnail`)
        .set({ storageURL });
}));
exports.changeStoryCount = functions.database
    .ref('/categories/{pushId}/stories')
    .onWrite(event => {
    if (!event.data.exists()) {
        return event.data.ref.parent.child('count').set(0);
    }
    const stories = event.data.val();
    const size = Object.keys(stories).length;
    return event.data.ref.parent.child('count').set(size);
});
exports.storyDelete = functions.database
    .ref('/stories/{storyId}')
    .onWrite((event) => __awaiter(this, void 0, void 0, function* () {
    // Exit if the data written is still there
    if (event.data.exists())
        return;
    const storyId = event.params.storyId;
    const story = event.data.previous.val();
    console.log(`Deleting files from the ${storyId} story in Storage.`);
    const files = yield bucket.deleteFiles({ prefix: `stories/${storyId}` });
    console.log(`Files left at stories/${storyId}`, files);
    const categoryKeys = Object.keys(story.categories);
    yield admin.database().ref(`storyPictures/${storyId}`).remove();
    return categoryKeys.forEach(key => {
        admin.database().ref(`categories/${key}/stories/${storyId}`).remove();
    });
}));
exports.picturesDelete = functions.database
    .ref('/storyPictures/{storyId}')
    .onWrite((event) => __awaiter(this, void 0, void 0, function* () {
    // Exit if the data written is still there
    if (event.data.exists())
        return;
    const storyPictures = event.data.previous.val();
    const pictureKeys = Object.keys(storyPictures);
    return pictureKeys.forEach(key => {
        admin.database().ref(`pictures/${key}`).remove();
    });
}));
exports.removeCategoryFromStory = functions.database
    .ref('/stories/{storyId}/categories/{categoryId}')
    .onWrite(event => {
    // Exit if the data written is still there
    if (event.data.exists())
        return;
    const categoryRef = event.params.categoryId;
    const storyRef = event.params.storyId;
    return admin
        .database()
        .ref(`/categories/${categoryRef}/stories/${storyRef}`)
        .remove();
});
exports.createPermaLink = functions.database
    .ref('/stories/{storyId}')
    .onWrite(event => {
    // Only edit data when it is first created
    if (event.data.previous.exists())
        return;
    // Exit when the data is deleted.
    if (!event.data.exists())
        return;
    const storyId = event.params.storyId;
    return event.data.ref
        .child('permaLink')
        .set(`https://www.gideonlabs.com/postsByKey/${storyId}`);
});
exports.writeFeaturedImage = functions.database
    .ref('/storyPictures/{storyId}/{pictureId}/thumbnail/webp')
    .onWrite((event) => __awaiter(this, void 0, void 0, function* () {
    // Only edit data when it is first created
    if (event.data.previous.exists()) {
        return console.log('WebP data already exsisted, exiting');
    }
    // Exit when the data is deleted.
    if (!event.data.exists()) {
        return console.log('WebP data deleted, exiting');
    }
    const { storyId, pictureId } = event.params;
    const featured = yield admin
        .database()
        .ref(`/storyPictures/${storyId}/${pictureId}/featured`)
        .once('value');
    // Exit if this is not a featured image
    if (!featured.val()) {
        return console.log(`Featured is ${featured.val()}, exiting`);
    }
    const thumbnailData = yield event.data.ref.parent.once('value');
    //console.log('Thumbnail data to be written:', thumbnailData.val());
    const categories = yield admin
        .database()
        .ref(`/stories/${storyId}/categories`)
        .once('value');
    if (categories.val() === null || undefined) {
        return console.log(`Categories don't exist on this story, exiting`);
    }
    // console.log('Categories', categories.val());
    // console.log('Category keys', Object.keys(categories.val()));
    const categoryKeys = Object.keys(categories.val());
    // Add thumbnail data to story
    //console.log(`Writing thumbnailData to ${storyId}`);
    yield admin
        .database()
        .ref(`/stories/${storyId}/featuredImage`)
        .set(thumbnailData.val());
    // Add thumbnail data to each category
    //console.log('Writing thumbnailData to each category...');
    return categoryKeys.forEach((key) => __awaiter(this, void 0, void 0, function* () {
        console.log(`Writing thumbnail data to ${key} category`);
        yield admin
            .database()
            .ref(`/categories/${key}/stories/${storyId}/thumbnail`)
            .set(thumbnailData.val());
    }));
}));
exports.convertToWebP = functions.storage.object().onChange((event) => __awaiter(this, void 0, void 0, function* () {
    // Exit if this is triggered on a file that is not an image.
    if (!event.data.contentType.startsWith('image/'))
        return;
    // Exit if this is a move or deletion event.
    if (event.data.resourceState === 'not_exists')
        return;
    const path = event.data.name;
    const [storyPath, storyKey, pictureKey, fileName] = path.split('/');
    const pictureSlug = fileName.split('.')[0];
    // Exit if the image is already in the WebP format.
    if (fileName.endsWith('.webp'))
        return;
    // Use the Buffer to download, convert, and upload the image
    // https://github.com/tuelsch/bolg/blob/master/functions/index.js
    // Download file
    const file = bucket.file(path);
    const downloadBuffer = yield file.download();
    // Convert file
    const buffer = yield imagemin.buffer(Buffer.concat(downloadBuffer), {
        plugins: [imageminWebp({ quality: 50 })]
    });
    console.log(`Buffer byteLength for ${pictureSlug}.webp`, buffer.byteLength);
    // Upload file
    let destination = `${storyPath}/${storyKey}/${pictureKey}/${pictureSlug}.webp`;
    if (fileName.startsWith(thumbPrefix)) {
        destination = `${storyPath}/${storyKey}/${pictureKey}/thumb_${pictureSlug}.webp`;
    }
    console.log(`Uploading ${pictureSlug}.webp to destination`);
    const newBucketFile = bucket.file(destination);
    yield newBucketFile.save(buffer, {
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
        yield admin
            .database()
            .ref(`/pictures/${pictureKey}/thumbnail`)
            .update({ webp: storageURL });
        yield admin
            .database()
            .ref(`/storyPictures/${storyKey}/${pictureKey}/thumbnail`)
            .update({ webp: storageURL });
    }
    else {
        yield admin
            .database()
            .ref(`/pictures/${pictureKey}/original`)
            .update({ webp: storageURL });
        yield admin
            .database()
            .ref(`/storyPictures/${storyKey}/${pictureKey}/original`)
            .update({ webp: storageURL });
    }
}));
