const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();


const db = new sqlite3.Database('../para.db', (error) => {
    if (error) throw error;
    console.log('Connected to SQLite database!');
});



app.get('/login', (req, res) => {
    db.all('SELECT * FROM a_accounts inner join f_files on a_accounts.a_userid =f_files.f _u_userid WHERE u_username LIKE ' + req.body.username + ' AND password like ' + req.body.password, (err, rows) => {
       if(err) throw err;

       const json_data = JSON.stringify(rows);

       res.header("Content-Type", "application/json");
       res.send(json_data);
    });
});

app.get('/signup', (req, res) => {
    db.get('SELECT id FROM a_accounts WHERE a_username like ?', req.body.username, (err, row) => {
        if(row){
            res.status(409).send('User already exists');
        } else {
            db.run(`INSERT INTO a_accounts (a_username, a_email, a_password) values(${row.body.username}, ${row.body.email}, ${row.body.password})`, (err) => {
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
    console.log(`Server started on Port: ${port}`);
});



let sql;
sql = `INSERT INTO accounts(username, email, password) values(?, ?, ?)`


db.run(sql, ["test", "test@test.com", "test"], (error) => {});