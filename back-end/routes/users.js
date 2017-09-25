var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const userQueries = require('../db/queries/user-queries');

/* GET users listing. */
router.post('/signup', function(req, res, next) {
  const user = {
  	name: req.body.name,
  	email: req.body.email,
    username: req.body.username,
  	password: bcrypt.hashSync(req.body.password, 10)
  };

  console.log(user)

  userQueries.create(user)
  .then( knexData  => {

      // sendWelcomeEmail(req.body.email);

      res.status(201).json({
          message: 'User created',
          obj: knexData
      })
  })
  .catch(err => {
      if(err.code === "ER_DUP_ENTRY") err = {message: 'User already registered'};
      return res.status(500).json({
          status: 'failed',
          error: err
      });
  });
});

let sendWelcomeEmail = (email) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: 'tim.musgrove@connected2fiber.com',
        pass: 'Iaapolol!Iitb9'
    },
    tls: {
        ciphers:'SSLv3'
    }
  })

  var htmlstream = fs.createReadStream('notifications/welcome.html');

  let mailOptions = {
      from: '"Table Tennis USA Team" <tim.musgrove@connected2fiber.com>',
      to: email,
      subject: 'Welcome to Table Tennis USA',
      replyTo: 'tim.musgrove@connected2fiber.com',
      html: htmlstream
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}

module.exports = router;
