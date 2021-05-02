const nodemailer = require('nodemailer');
// const keys = require('../../config/keys');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.emailID,
    pass: process.env.emailPassword
  }
});

const sendEmail = data => {
  return new Promise((resolve, reject) => {
    console.log('mail data', JSON.stringify(data, null, 2));
    let mailOptions = {
      from: process.env.emailID,
      to: data.to,
      subject: data.subject,
      html: data.body
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log(err);
      console.log(info);
      resolve();
    });
  });
};

module.exports = sendEmail;
