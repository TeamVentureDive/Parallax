const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const path = require("path");
const fs = require("fs");
const port = 6189;
const dbc = require('../connectDb.js');

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "temp.html"));
}),

app.post("/friend", (req, res) => {
    /*res.send(req.body);
    console.log(req.body);*/
    const email1 = req.body.email1;
    const email2 = req.body.email2;
    const password1 = req.body.password1;
    if (!email1 || !email2 || !password1) {
        res.json({login: "blocked"});
        return;
    }
    dbc.db.get(`SELECT * FROM a_accounts WHERE a_email like "${email1}" AND a_password LIKE "${password1}"`, (err, row) => {
        if (err) throw err;
        if (!row) {
            res.json({login: "blocked"});
            return;
        }
    });
    dbc.db.get(`INSERT INTO f_friends VALUES ("${email1}", "${email2}")`, (err, row) => {
        if (err) throw err;
        if (!row) {
            res.json({friend: "successful"});
        } 
    });
});

app.post("/unfriend", (req, res) => {
    /*res.send(req.body);
    console.log(req.body);*/
    const email1 = req.body.email1;
    const email2 = req.body.email2;
    const password1 = req.body.password1;
    if (!email1 || !email2 || !password1) {
        res.json({login: "blocked"});
        return;
    }
    dbc.db.get(`SELECT * FROM a_accounts WHERE a_email like "${email1}" AND a_password = "${password1}"`, (err, row) => {
        if (err) throw err;
        if (!row) {
            res.json({login: "blocked"});
            return;
        }
    });
    dbc.db.get(`DELETE FROM f_friends WHERE (f1_a_email LIKE "${email1}" AND f2_a_email LIKE "${email2}") OR (f1_a_email LIKE "${email2}" AND f2_a_email LIKE "${email1}")`, (err, row) => {
        if (err) throw err;
        if (!row) {
            res.json({unfriend: "successful"});
        } 
    });
});

app.listen(port);

console.info("[FriendSystem] Online on port " + port);