const express = require('express');
const bodyParser = require('body-parser');
const dbc = require('../connectDb.js');

const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use(bodyParser.urlencoded({extended: true}));

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if(isEmailValid(email)) {
        dbc.db.get(`SELECT * FROM a_accounts WHERE a_email LIKE "` + email + '" AND a_password LIKE "' + password + '"', (err, row) => {
            if(!row || err){
                dbc.db.all('SELECT * FROM a_accounts inner join f_files on a_accounts.a_email = f_files.f_a_email WHERE a_email LIKE "' + email + '" AND a_password like "' + password + '"', (err, rows) => {
                const json_data = JSON.stringify(rows);
                if (err) res.json(email + 'User nicht in der Datenbank!');
                res.json(email + 'User nicht in der Datenbank!');
                });
            }else{
                res.json("Login success!");
            }
        });
    }
});

app.post('/signup', (req, res) => {
    console.log(req.body);
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        if(isEmailValid(email)){
            dbc.db.get('SELECT * FROM a_accounts WHERE a_email LIKE "' + email + '"', (err, row) => {
        if(row){
            res.status(409).json("User already exists");
        } else {
            dbc.db.run(`INSERT INTO a_accounts (a_username, a_email, a_password) values("${username}", "${email}", "${password}")`, (err) => {
                if(err){
                    res.json('Internal Server Error!' + row);
                }else {
                    res.status(200).json('User created successfully!');
                }
            });
        }
    });
        }else{
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