var createCode = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('para.db');
const express = require('express');
const app = express();
var bodyParser  = require("body-parser");

db.run(`INSERT INTO t_tempcode(t_code, t_active) VALUES(${createCode}, ${true})`, function(err) {
  if (err) {
    return console.log(err.message);
  }
});

db.close();

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'parallax.venturedive.team@gmail.com',
    pass: 'Nf13vVjQR17agch'
  }
});

<<<<<<< Updated upstream
var mailOptions = {
  from: 'parallax.venturedive.team@gmail.com',
  to: `${email}`,
  subject: 'Ihr Einmalcode',
  text: `Hallo ${email},
=======
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  next();
});
>>>>>>> Stashed changes

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sendMail', (req, res) => {
  const mail = req.body.email;
  var mailOptions = {
    from: 'parallax.venturedive.team@gmail.com',
    to: `${mail}`,
    subject: 'Ihr Einmalcode',
    text: `Hallo ${mail},
  
    wir haben Ihre Anforderung für einen Einmalcode für Ihr Parallax-Konto erhalten.
    
    Ihr Einmalcode lautet: ${createCode}
    
    Wenn Sie diesen Code nicht angefordert haben, können Sie diese E-Mail ignorieren, da Ihre E-Mail-Adresse u. U. versehentlich von einer anderen Person eingegeben wurde.
    
    Mit freundlichen Grüßen
    Ihr Parallax-Konto-Team
    `
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});


const port = 6969;
app.listen(port, () => {
    console.log(`Database API started on Port: ${port}`);
});