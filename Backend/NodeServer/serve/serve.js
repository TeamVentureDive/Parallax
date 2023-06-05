const app = require("./webserver");
const fs = require("fs");
const path = require("path");
const dbc = require("../connectDb");
const bodyParser = require("body-parser");

const download = require("../fileserver/download");
const upload = require("../fileserver/upload");
const passwordForget = require("../passwordForget");
const friendSystem = require("../login/friendsystem");

app.use(bodyParser.json());

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "..", "Frontend", "signup.html"));
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
            loginInvalid = true;
        }
    });
    if (loginInvalid) return;

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

app.listen(80);