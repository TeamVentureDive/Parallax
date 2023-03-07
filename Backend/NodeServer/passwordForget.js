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

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME =  "parallax.venturedive.team@gmail.com",
    pass: process.env.MAIL_PASSWORD =  "Nf13vVjQR17agch",
    clientId: process.env.OAUTH_CLIENTID = "198579156679-v1m64hc9f0fbumfhmbf59qtpns05pu4i.apps.googleusercontent.com",
    clientSecret: process.env.OAUTH_CLIENT_SECRET = "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",
    refreshToken: process.env.OAUTH_REFRESH_TOKEN = "1//04iEEtM1mHuBsCgYIARAAGAQSNwF-L9Irr8INppTE6POJlTi2sfGkPhyr4u3OW7cJwcwgq7ANeTgPD0q88lozM39KX7xVNrrVPGg"
  }
});


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sendMail', async(req, res) => {
  const mail = req.body.email;
  const row = await new Promise((resolve, reject) => {
    db.get(`SELECT * FROM a_accounts WHERE a_email LIKE '${mail}'` , (err , row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
  if (!row) {
    res.json("No rows found");
    res.send();
    return;
  }

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
      res.statusCode = 500;
    } else {
      console.log('Email sent: ' + info.response);
      res.statusCode = 200;
    }
    res.json("");
    res.send();
  });
});

app.use('/checkVerification', (req, res) => {
  const token = req.body.token;
  db.get(`SELECT * FROM t_tempcode WHERE t_code LIKE ${token}`, (err, row) => {
    if(err || !row) {
      res.status = 500;
      res.json("No rows found");
      res.send();
      return;
    } else {
      res.status = 200;
      res.json("Approved");
      res.send();
      db.run(`DELETE FROM t_tempcode WHERE t_code LIKE ${token}`);
    }
  })
});

const port = 6969;
app.listen(port, () => {
    console.log(`Database API started on Port: ${port}`);
});