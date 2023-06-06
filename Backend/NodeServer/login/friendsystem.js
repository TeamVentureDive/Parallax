const app = require("../serve/webserver");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const port = 6189;
const dbc = require('../connectDb.js');

app.use(bodyParser.json());

app.post("/friend", (req, res) => {
    const email = req.body.email;
    //const email2 = req.body.email2;
    const password = req.body.password;
    //const codeForEmail2 = req.body.code;
    const codeFromFriend = req.body.code;

    if (!email || !password || !codeFromFriend) {
        res.json({variables: "missing"});
        return;
    }

    dbc.db.get(`SELECT * FROM a_accounts WHERE a_email like "${email}" AND a_password LIKE "${password}"`, (err, row) => {
        if (err) throw err;
        if (!row) {
            res.json({login: "blocked"});
            return;
        }

        dbc.db.get(`SELECT * FROM a_accounts WHERE a_hash LIKE "${codeFromFriend}"`, (err, row2) => {
            if (err) throw err;
            if (!row2) {
                res.json({code: "blocked"});
                return;
            }
            if (email == row2.a_email) {
                res.json({code: "blocked_self"});
                return;
            }
            
            dbc.db.run(`INSERT INTO f_friends VALUES ("${email}", "${row2.a_email}")`, err => {
                if (err) throw err;
                res.json({friend: "successful"});
            });
        })
    });
});

app.post("/unfriend", (req, res) => {
    const email1 = req.body.email1;
    const email2 = req.body.email2;
    const password1 = req.body.password1;

    if (!email1 || !email2 || !password1) {
        res.json({variables: "missing"});
        return;
    }

    dbc.db.get(`SELECT * FROM a_accounts WHERE a_email like "${email1}" AND a_password = "${password1}"`, (err, row) => {
        if (err) throw err;
        if (!row) {
            res.json({login: "blocked"});
            return;
        }

        dbc.db.run(`DELETE FROM f_friends WHERE (f1_a_email LIKE "${email1}" AND f2_a_email LIKE "${email2}") OR (f1_a_email LIKE "${email2}" AND f2_a_email LIKE "${email1}")`, err => {
            if (err) throw err;
            res.json({unfriend: "successful"});
        });
    });
});

app.listen(port);

console.info("[FriendSystem] Online");