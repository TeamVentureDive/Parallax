const webserver = require("./webserver");
const app = webserver.app;
const express = webserver.express;

const fs = require("fs");
const path = require("path");
const dbc = require("../connectDb");

const download = require("../fileserver/download");
const upload = require("../fileserver/upload");
const friendSystem = require("../login/friendsystem");
const passwordForget = require("./passwordForget");


app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "..", "Frontend", "signup.html"));
});

app.post("/signup", (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

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

app.get("/",  (req, res) => {
    res.sendFile(path.join(__dirname,"..", "..", "..", "Frontend", "login.html"));
});

app.post("/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.json({login: "blocked_no_credentials"});
        return;
    }

    dbc.db.get(`SELECT * FROM a_accounts WHERE a_email LIKE "${email}" AND a_password LIKE "${password}"`, (err, accountRow) => {
        if (err) throw err;
        if (!accountRow) {
            res.json({login: "blocked"});
            return;
        }

        const rawIndexData = fs.readFileSync(path.join(__dirname, "..", "..", "..", "Frontend", "dataTransfer.html"), "utf-8");
        const rawFileContainer = fs.readFileSync(path.join(__dirname, "..", "..", "..", "Frontend", "fileContainer.html"), "utf-8");
        let insertData = "";
    
        //GET DATA
        dbc.db.all(`SELECT * FROM f_friends WHERE f1_a_email LIKE "${email}" OR f2_a_email LIKE "${email}"`, (err, friendRows) => {
            if (err) throw err;
            if (!friendRows) return;
            
            const validAccounts = [email];
            
            friendRows.forEach(friend => {
                if (friend.f1_a_email != email) {
                    validAccounts.push(friend.f1_a_email);
                }
                if (friend.f2_a_email != email) {
                    validAccounts.push(friend.f2_a_email);
                }
            });
            
            
            let data = [];
            let index = 0;
            validAccounts.forEach(email => {
                dbc.db.all(`select * from a_accounts as a inner join f_files as f on a.a_email = f.f_a_email where a_email like "${email}"`, (err, fileAccountRows) => {
                    
                    if (err) throw err;
                    if (!fileAccountRows) return;

                    fileAccountRows.forEach(fileAccountRow => {
                        let tempEntry = rawFileContainer + " ";
                        insertData += tempEntry
                                        .replaceAll("<!--EMAIL_HERE-->", fileAccountRow.f_a_email)
                                        .replaceAll("<!--FILENAME_HERE-->", fileAccountRow.f_name)
                                        .replaceAll("<!--FILEDATE_HERE-->", fileAccountRow.f_date)
                                        .replaceAll("<!--LINK_HERE-->", fileAccountRow.f_id)
                                        .replaceAll("<!--USERNAME_HERE-->", fileAccountRow.a_username);
                    });
                    
                    index++;

                    if (index >= validAccounts.length) {
                        //Inserting Data
                        const stringToSend = rawIndexData
                                        .replaceAll("<!--DATA_HERE-->", insertData)
                                        .replaceAll("<!--USERNAME_HERE-->", accountRow.a_username)
                                        .replaceAll("<!--EMAIL_HERE-->", accountRow.a_email)
                                        .replaceAll("<!--HASH_HERE-->", accountRow.a_hash)
                                        .replaceAll("<!--PASSWORD_HERE-->", accountRow.a_password);
                        res.type("html").send(stringToSend);
                    }
                });
            });


            
    
        });

    });

});

app.listen(80);