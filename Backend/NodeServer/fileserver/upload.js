const formidable = require("formidable");
const path = require("path");
const express = require("express");
const fs = require("fs");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const port = 1234;

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");    
    fs.readFile("temp.html", (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});

app.use(express.json());

app.post("/upload", (req, res) => {
    const form = new formidable.IncomingForm({uploadDir: path.join(__dirname, "uploaded_files")});
    form.parse(req, (err, fields, files) => {
        isInDatabase(fields.email, fields.password, files.upload);
        /*if (!isInDatabase(fields.email, fields.password)) {
            fs.unlinkSync(path.join(__dirname, "uploaded_files", files.upload.newFilename));
            console.log(`[FileServer] Blocked Upload of File "${files.upload.originalFilename}" due to wrong credentials`);
            res.status(401).json(JSON.stringify({file: "blocked"}));
            return;
        }
        if (!addToDatabase(files.upload, fields.email)) {
            fs.unlinkSync(path.join(__dirname, "uploaded_files", files.upload.newFilename));
            console.log(`[FileServer] Blocked Upload of File "${files.upload.originalFilename}" due to a Database-Error`);
            res.status(500).json(JSON.stringify({file: "blocked"}));
            return;
        }
        console.log(`[FileServer] Saved User-File "${files.upload.originalFilename}" as "${files.upload.newFilename}"`);
        res.status(200).json(JSON.stringify({file: "uploaded"}));*/

    });
});

app.listen(port, () => {
    console.log("[FileServer] Upload Online");
});

const db = new sqlite3.Database("../para.db", (err) => {
    if (err) throw err;
    console.log("[FileServer] Upload Connected to SQLite Database");
});

function isInDatabase(email, password, file) {
    db.get(`SELECT * FROM a_accounts WHERE a_email LIKE "${email}" AND a_password LIKE "${password}"`, (err, row) => {
        //keine ahnung wie ich das async machen werde.
        if (err) throw err;
        if (row) addToDatabase(file, email);
    });
}

function addToDatabase(file, email) {
    db.run(`INSERT INTO f_files values ("${file.newFilename}", "${file.originalFilename}", "${email}" ,"${new Date(Date.now()).toDateString()}")`, err => {
        if (err) throw err;
    });
}