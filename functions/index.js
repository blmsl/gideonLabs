const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');


admin.initializeApp(functions.config().firebase);

const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

exports.sendContactMessage = functions.database.ref('/messages/{pushKey}').onWrite(event => {
  const snapshot = event.data;
  const val = snapshot.val();

  const mailOptions = {
    from: `${val.name} - ${val.email}`,
    to: 'markgoho@gmail.com',
    subject: `Information Request - ${val.date}`,
    html: val.problem
  };

  return mailTransport.sendMail(mailOptions).then(() => console.log('Mail sent to: markgoho@gmail.com'));
});
