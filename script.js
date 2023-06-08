
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 5500;
const path = require('path');
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/subscribe', (req, res) => {
  const userEmail = req.body.email;


  console.log('Received email:', userEmail);
  // Call a function to send the email using Nodemailer
  sendEmail(userEmail)
    .then(() => {
      res.status(200).json({ message: 'Email sent successfully' });
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email' });
    });
});

function sendEmail(userEmail){
const NEWS_ACC_EMAIL = process.env.NEWS_ACC_EMAIL;
const NEWS_ACC_PASS = process.env.NEWS_ACC_PASS;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: NEWS_ACC_EMAIL,
      pass: NEWS_ACC_PASS
    }
  });
  const mailOptions = {
    from: NEWS_ACC_EMAIL,
    to: userEmail,
    subject: 'Hello from Nodemailer',
    text: 'This is the body of the email.'
  };

  return transporter.sendMail(mailOptions);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




  