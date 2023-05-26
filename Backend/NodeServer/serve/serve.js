const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const dbc = require("../connectDb");
const formidable = require("formidable");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
    const rawIndexData = fs.readFileSync(path.join(__dirname, "..", "FE", "index.html"), "utf-8");
    const rawFileContainer = fs.readFileSync(path.join(__dirname, "..", "FE", "fileContainer.html"), "utf-8");
    let insertData = "";
    //GET DATA
    let data;
    dbc.db.all(`SELECT * FROM f_friends WHERE f1_a_email LIKE ${req.body.email} OR f2_a_email LIKE ${req.body.email}`, (err, rows) => {
        if (err) throw err;
        if (!rows) return;

        const validAccounts = [];
        rows.forEach(row => {
            if (row.f1_a_email != req.body.email) {
                validAccounts.push(row.f1_a_email);
            }
            if (row.f2_a_email != req.body.email) {
                validAccounts.push(row.f2_a_email);
            }
        });

        dbc.db.get(`SELECT * FROM a_accounts WHERE a_email LIKE ${req.body.email} AND a_password LIKE ${req.body.password}`, (err, row) => {
            if (err) throw err;
            if (!row) return;
            data.push(row);
        });

        validAccounts.forEach(email => {
            dbc.db.get(`SELECT * FROM a_accounts WHERE a_email LIKE ${email}`, (err, row) => {
                if (err) throw err;
                if (!row) return;
                data.push(row);
            });
        });

    });
    //GET DATA

    //DEBUG
    data = [
        {
            name: "max@spenger.com",
            filename: "abc",
            filedate: 123
        },
        {
            name: "spe@muster.at",
            filename: "def",
            filedate: 4535
        },
        {
            name: "muster@deine.mom",
            filename: "dzxy",
            filedate: 45555
        }
    ]
    //DEBUG
    data.forEach(entry => {
        let tempEntry = 
        rawFileContainer
        .replace("<!--NAME_HERE-->", entry.name)
        .replace("<!--FILENAME_HERE-->", entry.filename)
        .replace("<!--FILEDATE_HERE-->", entry.filedate);
        insertData += tempEntry;
    });

    const stringToSend = rawIndexData.replace("<!--DATA_HERE-->", insertData);
    res.send(stringToSend);
});

app.listen(80);