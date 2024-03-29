const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbc = require("../connectDb.js");

app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (isEmailValid(email)) {
    // dbc.db.get(`SELECT * FROM a_accounts WHERE a_email LIKE "` + email + '" AND a_password LIKE "' + password + '"', (err, row) => {
    //         dbc.db.all('SELECT * FROM f_files WHERE f_a_email LIKE "' + email, (err, rows) => {
    //             const json_data = JSON.stringify(rows);
    //             if (err) res.json(email + 'User nicht in der Datenbank!');
    //             res.json(json_data);
    //     });
    //         res.send(row);
    // });

    dbc.db.all(
      `SELECT * from a_accounts as a inner join f_files as f on a.a_email = f.f_a_email WHERE a.a_email LIKE "` +
        email +
        '" AND a.a_password LIKE "' +
        password +
        '"',
      (err, rows) => {
        res.json(rows);
      }
    );
  }
});

async function checkToken(token) {
    let check = false;
    console.log(token);
    await dbc.db.get(
        'SELECT * FROM a_accounts WHERE a_hash LIKE "' + token + '"',
        (err, row) => {
          if (!row || err) {
            check = true;
          } else if(row) {
            check = false;
          }
        }
    );
    //console.log(check);
    return check;
}

app.post("/signup", (req, res) => {
  var token = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  while (checkToken(token) === false) {
    token = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
  }
  if (isEmailValid(email)) {
    dbc.db.get(
      'SELECT * FROM a_accounts WHERE a_email LIKE "' + email + '"',
      (err, row) => {
        if (row) {
          res.status(409).json("User already exists");
        } else {
          dbc.db.run(
            `INSERT INTO a_accounts (a_hash, a_username, a_email, a_password) values("${token}", ${username}", "${email}", "${password}")`,
            (err, row) => {
              if (err) {
                res.json("Internal Server Error!" + row);
              } else {
                res.status(200).json("User created successfully!");
              }
            }
          );
        }
      }
    );
  } else {
    res.json('"' + email + '" is not a valid Email!');
  }
});

const port = 6969;
app.listen(port, "localhost", () => {
  console.log(`Database API started on Port: ${port}`);
});

function isEmailValid(email) {
  // Definiere den regulären Ausdruck für ein E-Mail-Schema
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Verwende test() Methode, um zu prüfen, ob der String dem Schema entspricht
  return emailRegex.test(email);
}
