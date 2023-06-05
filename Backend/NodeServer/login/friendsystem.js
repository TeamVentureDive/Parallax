const app = require("../serve/webserver");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const port = 6189;
const dbc = require('../connectDb.js');

app.use(bodyParser.json());

app.post("/friend", (req, res) => {
    /*res.send(req.body);
    console.log(req.body);*/
    const email1 = req.body.email1;
    const email2 = req.body.email2;
    const password1 = req.body.password1;
    const codeForEmail2 = req.body.code;

    if (!email1 || !email2 || !password1 || !codeForEmail2) {
        res.json({login: "blocked"});
        return;
    }

    dbc.db.get(`SELECT * FROM a_accounts WHERE a_email like "${email1}" AND a_password LIKE "${password1}"`, (err, row) => {
        if (err) throw err;
        if (!row) {
            res.json({login: "blocked"});
            return;
        }

        dbc.db.get(`SELECT * FROM a_accounts WHERE t_tempcode LIKE "${codeForEmail2}"`, (err, row) => {
            if (err) throw err;
            if (!row) {
                res.json({code: "blocked"});
                return;
            }
            if (row.email !== email2) {
                res.json({code: "blocked"});
                return;
            }
        })

        dbc.db.get(`INSERT INTO f_friends VALUES ("${email1}", "${email2}")`, (err, row) => {
            if (err) throw err;
            if (!row) {
                res.json({friend: "successful"});
            } 
        });
    });
});

app.post("/unfriend", (req, res) => {
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
    
    dbc.db.run(`DELETE FROM f_friends WHERE (f1_a_email LIKE "${email1}" AND f2_a_email LIKE "${email2}") OR (f1_a_email LIKE "${email2}" AND f2_a_email LIKE "${email1}")`, err => {
        if (err) throw err;
        res.json({unfriend: "successful"});
    });
});

app.listen(port);

console.info("[FriendSystem] Online on port " + port);