require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 5500;


app.use(express.json());
app.use(express.static('public'));


app.post('/subscribe', (req, res) => {
  const userEmail = req.body.email;

  // Call a function to send the email using Nodemailer
  sendEmail(userEmail)
    .then(() => {
      res.status(200).json({ message: 'Email sent successfully' });
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email' });
    });
    res.send('Subscription successful');
});

function sendEmail(userEmail){

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NEWS_ACC_EMAIL,
      pass: process.env.NEWS_ACC_PASS
    }
  });
  const mailOptions = {
    from: process.env.NEWS_ACC_EMAIL,
    to: userEmail,
    subject: 'Hello from Nodemailer',
    text: 'This is the body of the email.'
  };

  return transporter.sendMail(mailOptions);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



  