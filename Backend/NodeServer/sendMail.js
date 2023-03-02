var createCode = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('para.db');

db.run(`INSERT INTO t_tempcode(t_code, t_active) VALUES(${createCode}, ${true})`, function(err) {
  if (err) {
    return console.log(err.message);
  }
});

db.close();

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

var mailOptions = {
  from: 'parallax.venturedive.team@gmail.com',
  to: `alex1907654@gmail.com`,
  subject: 'Ihr Einmalcode',
  text: `Hallo alex1907654@gmail.com,

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