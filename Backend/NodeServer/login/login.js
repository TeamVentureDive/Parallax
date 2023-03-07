const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const path = require("path");
const app = express();

const db = new sqlite3.Database('../para.db', (error) => {
    if (error) throw error;
    console.log('Connected to SQLite database!');
});

// db.run('INSERT INTO a_accounts (a_username, a_email, a_password) VALUES ("testuser", "test@test.com", "password123")');
// db.run('INSERT INTO f_files (f_a_email, f_name) VALUES ("test@test.com", "kekekekekekekek")');


// app.get("/web", (req, res) => {
//     res.sendFile(path.join(__dirname, "../../../Frontend/login.html"));
// });

app.post('/login', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    db.all('SELECT * FROM a_accounts inner join f_files on a_accounts.a_email = f_files.f_a_email WHERE a_email LIKE "' + req.query.email + '" AND a_password like "' + req.query.password + '"', (err, rows) => {

        if(err) {
           res.json(req.query.email + " " + req.query.password);
           console.log(err);
           return;
       }

       const json_data = JSON.stringify(rows);

       res.json(req.query.email + " " + req.query.password + ":" + json_data);

    });
});

app.post('/signup', (req, res) => {
    db.get('SELECT id FROM a_accounts WHERE a_username like "' + req.query.username + '"', (err, row) => {
        if(row){
            res.status(409).send('{"Error":"User already exists"}');
        } else {
            db.run(`INSERT INTO a_accounts (a_username, a_email, a_password) values(${row.query.username}, ${row.query.email}, ${row.query.password})`, (err) => {
                if(err){
                    console.error(err);
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