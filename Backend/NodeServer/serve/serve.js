const webserver = require("./webserver");
const app = webserver.app;
const express = webserver.express;

const fs = require("fs");
const path = require("path");
const dbc = require("../connectDb");
const bodyParser = require("body-parser");

const download = require("../fileserver/download");
const upload = require("../fileserver/upload");
const passwordForget = require("../passwordForget");
const friendSystem = require("../login/friendsystem");

app.use(bodyParser.json());

app.use(express.static(path.join("..", "..", "..", "Frontend")));

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "..", "Frontend", "signup.html"));
});

app.post("/signup", (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    console.log(req.body);

    if (!username || !email ||!password) {
        res.json({login: "blocked"});
        return;
    }

    const codeHash = (Math.floor(Math.random() * 100000) + "").padStart(5, "0");

    dbc.db.run(`INSERT INTO a_accounts VALUES ("${username}", "${email}", "${password}", "${codeHash}")`, err => {
        if (err) throw err;
    });
    res.json({login: "success"});
    console.log(`[Signup] Signed up User ${username} with email ${email}, password ${password} and code (hash) ${codeHash}`);
});

app.get("/", (req, res) => {

    if (!req.body.email || !req.body.password) {
        res.sendFile(path.join(__dirname, "..", "..", "..", "Frontend", "login.html"));
        return;
    }

    loginInvalid = false;

    dbc.db.get(`SELECT * FROM a_accounts WHERE a_email LIKE ${req.body.email} AND a_password LIKE ${req.body.password}`, (err, row) => {
        if (err) throw err;
        if (!row) {
            return;
        }

        const rawIndexData = fs.readFileSync(path.join(__dirname, "..", "..", "Frontend", "dataTransfer.html"), "utf-8");
        const rawFileContainer = fs.readFileSync(path.join(__dirname, "..", "..", "Frontend", "fileContainer.html"), "utf-8");
        let insertData = "";
    
        //GET DATA
        let data;
        dbc.db.all(`SELECT * FROM f_friends WHERE f1_a_email LIKE ${req.body.email} OR f2_a_email LIKE ${req.body.email}`, (err, rows) => {
            if (err) throw err;
            if (!rows) return;
    
            const validAccounts = [req.body.email];
    
            rows.forEach(row => {
                if (row.f1_a_email != req.body.email) {
                    validAccounts.push(row.f1_a_email);
                }
                if (row.f2_a_email != req.body.email) {
                    validAccounts.push(row.f2_a_email);
                }
            });
    
            validAccounts.forEach(email => {
                dbc.db.get(`SELECT * FROM f_files WHERE f_a_email LIKE ${email}`, (err, row) => {
                    if (err) throw err;
                    if (!row) return;
                    data.push(row);
                });
            });
    
            //Inserting Data
    
            data.forEach(entry => {
                let tempEntry = rawFileContainer + " ";
                tempEntry
                .replace("<!--NAME_HERE-->", entry.name)
                .replace("<!--FILENAME_HERE-->", entry.f_name)
                .replace("<!--FILEDATE_HERE-->", entry.f_date)
                .replace("<!--LINK_HERE-->", entry.f_id);
                insertData += tempEntry;
            });
        
            const stringToSend = rawIndexData.replace("<!--DATA_HERE-->", insertData);
            res.type("html").send(stringToSend);
        });

    });

});

app.listen(80);