const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');

const app = express();



const db = new sqlite3.Database('../para.db', (error) => {
    if (error) throw error;
    console.log('Connected to SQLite database!');
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');
    next();
});

// db.run('INSERT INTO a_accounts (a_username, a_email, a_password) VALUES ("testuser", "test@test.com", "password123")');
// db.run('INSERT INTO f_files (f_a_email, f_name) VALUES ("test@test.com", "kekekekekekekek")');


// app.get("/web", (req, res) => {
//     res.sendFile(path.join(__dirname, "../../../Frontend/login.html"));
// });
app.use(bodyParser.urlencoded({extended: true}));

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if(isEmailValid(email)) {
        db.get(`SELECT * FROM a_accounts WHERE a_email LIKE "` + email + '" AND a_password LIKE "' + password + '"', (err, row) => {
            if(!row || err){
            db.all('SELECT * FROM a_accounts inner join f_files on a_accounts.a_email = f_files.f_a_email WHERE a_email LIKE "' + email + '" AND a_password like "' + password + '"', (err, rows) => {
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
        db.get('SELECT * FROM a_accounts WHERE a_email LIKE "' + email + '"', (err, row) => {
        if(row){
            res.status(409).json("User already exists");
        } else {
            db.run(`INSERT INTO a_accounts (a_username, a_email, a_password) values("${username}", "${email}", "${password}")`, (err) => {
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