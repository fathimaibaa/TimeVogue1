const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'fathimaibaa@gmail.com', 
    pass: 'tped xewq vsyb oetp'
  }
});
module.exports = transporter;
