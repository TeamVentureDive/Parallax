const formidable = require("formidable");
const path = require("path");
const express = require("express");
const fs = require("fs");
const app = express();
const db = require("../connectDb");

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
        if (files.upload.length) {
            //TODO mutliple files
            return;
        }
        //isInDatabase(fields.email, fields.password, files.upload, res);
        //DEBUG ^^^trying to implement better solution^^^
        if (isValidAccount(fields.email, fields.password)) {

        }
    });
});

function isValidAccount() {
    let returnValue = false;
    db.db.get(`SELECT * FROM a_accounts WHERE a_email LIKE "${email}" AND a_password LIKE "${password}"`, (err, row) => {

    });

    db.db.
}

function isInDatabase(email, password, file) {
    db.db.get(`SELECT * FROM a_accounts WHERE a_email LIKE "${email}" AND a_password LIKE "${password}"`, (err, row) => {
        
        if (err) throw err;
        
        if (row) {
            addToDatabase(file, email);
            setTimeout(() => {
                fs.unlinkSync(path.join(__dirname, "uploaded_files", file.newFilename));
                removeFromDatabase(file, file.newFilename);
            }, 3600000);

            return;
        }
        
        fs.unlinkSync(path.join(__dirname, "uploaded_files", file.newFilename));
        console.log(`[FileServer] Blocked Upload of File "${file.originalFilename}" due to wrong credentials`);
        res.status(401).json(JSON.stringify({file: "blocked"}));
    });
}

function addToDatabase(file, email) {
    db.db.run(`INSERT INTO f_files values ("${file.newFilename}", "${file.originalFilename}", "${email}" ,"${new Date(Date.now()).toDateString()}")`, err => {
        if (err) throw err;
    });
}

function removeFromDatabase(file, fileId) {
    db.db.run(`DELETE FROM f_files WHERE f_a_email like "${fileId}"`, err => {
        if (err) throw err;
        res.json({link: `${req.get("host")}/${file.newFilename}`});
    });
}