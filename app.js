const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const CLIENT_ID = '480654068725-ujvfa7sdmdg3ag7n3b3khvme63cepicr.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04hflVID2w6CkCgYIARAAGAQSNwF-L9Ir3nyS11pVLQyR9KzdY_2GnA9H7ntXcnpbphLrmKBBzW-iai7s0m-wN-5mIsBUub_DEqg';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'ravisai189@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'RAVISAICHARAN📧<ravisai189@gmail.com>',
      to: 'ravi.charansai@gmail.com',
      subject: 'Hello',
      text: 'Hello from gmail email',
      html: '<h1>Good Morning!!!...Have a nice day😊</h1>',
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));