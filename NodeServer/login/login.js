const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();


const db = new sqlite3.Database('./login.db', (error) => {
    if (error) throw error;
    console.log('Connected to SQLite database!');
});



app.get('/login', (req, res) => {
    db.all('SELECT * FROM accounts', (err, rows) => {
       if(err) throw err;

       const json_data = JSON.stringify(rows);

       res.header("Content-Type", "application/json");
       res.send('{"Alex":"Sussy"}' + json_data);
    });
});



const port = 6969;
app.listen(port, "localhost", () => {
    console.log(`server started on Port: ${port}`);
});



let sql;
sql = `INSERT INTO accounts(username, email, password) values(?, ?, ?)`


db.run(sql, ["test", "test@test.com", "test"], (error) => {});
