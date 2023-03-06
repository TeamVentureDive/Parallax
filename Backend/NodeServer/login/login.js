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
app.use(express.json());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    db.all('SELECT * FROM a_accounts inner join f_files on a_accounts.a_email = f_files.f_a_email WHERE a_email LIKE "' + email + '" AND a_password like "' + password + '"', (err, rows) => {

        if(err) {
           //res.json('User nicht vorhanden!');
           res.json(email + " " + password);
           console.log(err);
           return;
       }

       const json_data = JSON.stringify(rows);

       res.json(email + " " + password + ":" + json_data);

    });
});

app.post('/signup', (req, res) => {
    db.get('SELECT id FROM a_accounts WHERE a_username like "' + req.body.username + '"', (err, row) => {
        console.log(req.body.username);
        if(row){
            console.log(req.body.username);
            res.status(409).send('{"Error":"User already exists"}');
        } else {
            db.run(`INSERT INTO a_accounts (a_username, a_email, a_password) values(${row.body.username}, ${row.body.email}, ${row.body.password})`, (err) => {
                if(err){
                    console.error(err);
                    console.log(req.body.username);
                    res.status(500).send('Internal Server Error!');
                }else {
                    res.status(200).send('User created successfully!');
                }
            });
        }
    })
});

const port = 6969;
app.listen(port, "localhost", () => {
    console.log(`Database API started on Port: ${port}`);
});