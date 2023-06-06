var createCode = Math.floor(Math.random() * 9000000) + 1000000;

let dbc = require("./connectDb");
const webserver = require("./serve/webserver");
const express = webserver.express;
const app = webserver.app;
var bodyParser  = require("body-parser");

dbc.db.run(`INSERT INTO t_tempcode(t_code, t_active) VALUES(${createCode}, ${true})`, function(err) {
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
    refreshToken: process.env.OAUTH_REFRESH_TOKEN = "1//04zEaJZDhUL5eCgYIARAAGAQSNwF-L9IrJ3ecYrKGUhxXqz6e2--AvjusHo3ZG1uttkwyitRM3-smL7RNclUsAE4caoxLCPx7IVI"
  }
});

//dumb find better method VVVV
  /*app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');
    next();
  });

  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));*/
//dumb find better method^^^^

app.post('/sendMail', async(req, res) => {
  const mail = req.body.email;
  const row = await new Promise((resolve, reject) => {
    dbc.db.get(`SELECT * FROM a_accounts WHERE a_email LIKE '${mail}'` , (err , row) => {
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

//Stop using app.use!!! VVV
  /*app.use('/checkVerification', (req, res) => {
    const token = req.body.token;
    dbc.db.get(`SELECT * FROM t_tempcode WHERE t_code LIKE ${token}`, (err, row) => {
      if(err || !row) {
        res.status = 500;
        res.json("No rows found");
        res.send();
        return;
      } else {
        res.status = 200;
        res.json("Approved");
        res.send();
        dbc.db.run(`DELETE FROM t_tempcode WHERE t_code LIKE ${token}`);
      }
    })
  });


  app.use('/passwordCheck', (req, res) => {
    const pw1 = req.body.f1PW;
    const pw2 = req.body.f2PW;
    const email = req.body.email;
    if (pw1 != pw2 || /^[A-Za-z0-9?!]{5,}$/.test(pw1) == false) {
      res.status = 200;
      res.json("The password typed in wasn't correct!");
      res.send();
      return;
    } else {
      dbc.db.get(
        `SELECT * FROM a_accounts WHERE a_email LIKE '${email}'`,
        (err, row) => {
          if (err || !row) {
            res.status = 500;
            res.json(`${err}`);
            res.send();
            return;
          } else {
            res.status = 200;
            res.json("Approved");
            res.send();
            dbc.db.run(
              `UPDATE a_accounts SET a_password = '${pw1}' WHERE a_email LIKE '${email}'`
            )
          }
        }
      );
    }
  });*/
//Seriusly??? ^^^^

const port = 2500;
app.listen(port, () => {
    console.log(`Database API started on Port: ${port}`);
});