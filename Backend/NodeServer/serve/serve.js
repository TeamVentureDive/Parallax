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
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join("..", "..", "..", "Frontend")));

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
        let data = [];
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

    
            validAccounts.forEach(email => {
                dbc.db.get(`select * from a_accounts as a inner join f_files as f on a.a_email = f.f_a_email where a_email like "${email}"`, (err, fileAccountRow) => {
                    if (err) throw err;
                    if (!fileAccountRow) return;
                    data.push(fileAccountRow);
                });
            });
    
            //Inserting Data
    
            data.forEach(entry => {
                let tempEntry = rawFileContainer + " ";
                insertData += tempEntry
                                .replace("<!--EMAIL_HERE-->", entry.f_a_email)
                                .replace("<!--FILENAME_HERE-->", entry.f_name)
                                .replace("<!--FILEDATE_HERE-->", entry.f_date)
                                .replace("<!--LINK_HERE-->", entry.f_id)
                                .replace("<!--USERNAME_HERE-->", entry.a_username);
            });
        
            const stringToSend = rawIndexData
                                    .replace("<!--DATA_HERE-->", insertData)
                                    .replace("<!--USERNAME_HERE-->", accountRow.a_username)
                                    .replace("<!--EMAIL_HERE-->", accountRow.a_email)
                                    .replace("<!--HASH_HERE-->", accountRow.a_hash)
                                    .replace("<!--PASSWORD_HERE-->", accountRow.a_password);
            res.type("html").send(stringToSend);
        });

    });

});

app.listen(80);