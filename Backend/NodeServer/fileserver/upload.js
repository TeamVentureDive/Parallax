const formidable = require("formidable");
const path = require("path");
const express = require("express");
const fs = require("fs");
const app = express();
const db = require("../connectDb");

//DEBUG VVV
app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    
    fs.readFile("temp.html", (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});
//DEBUG ^^^

app.use(express.json());

app.post("/upload", async (req, res) => {
    const form = new formidable.IncomingForm({uploadDir: path.join(__dirname, "uploaded_files")});
    form.parse(req, async (err, fields, files) => {
        if (files.upload.length) {
            for (let i = 0; i < files.upload.length; i++) {
                uploadFile(res, fields, files.upload[i]);
            }
            //still need to send a response after upload
            return;
        }
        //isInDatabase(fields.email, fields.password, files.upload, res);
        //DEBUG ^^^trying to implement better solution^^^
        uploadFile(res, fields, files.upload); // new implementation
            //still need to send a response after upload
        console.log(`[Fileserver-Upload] ${fields.email} uploaded file "${files.upload.originalFilename}" as "${files.upload.newFilename}"`);
    });
});

app.listen(611, "localhost");

function uploadFile(res, fields, file) {
    db.db.get(`SELECT * FROM a_accounts WHERE a_email LIKE "${fields.email}" AND a_password LIKE "${fields.password}"`, async (err, row) => {
        if (err) throw err;
        if (!row) {
            fs.unlinkSync(path.join(__dirname, "uploaded_files", file.newFilename));
            removeFromDatabase(file.newFilename);
            res.status(401).json({upload:"blocked"});
            console.log(`[FileServer-Upload] Blocked Upload of File "${file.originalFilename}" due to wrong credentials`);
            return;
        }
        addToDatabase(file, fields.email);
        setTimeout(() => {
            fs.unlinkSync(path.join(__dirname, "uploaded_files", file.newFilename));
            removeFromDatabase(file.newFilename);
        }, 3600000);
        res.status(400).setHeader("Content-Type", "application/json").send(JSON.stringify({upload: "uploaded"}))
    });
}

//OLD CODE VVV
function isValidAccount(email, password) {
    let returnValue = false;
    db.db.get(`SELECT * FROM a_accounts WHERE a_email LIKE "${email}" AND a_password LIKE "${password}"`, (err, row) => {

    });
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
//OLD CODE ^^^

function addToDatabase(file, email) {
    db.db.run(`INSERT INTO f_files values ("${file.newFilename}", "${file.originalFilename}", "${email}" ,"${new Date(Date.now()).toDateString()}")`, err => {
        if (err) throw err;
    });
}

function removeFromDatabase(fileId) {
    db.db.run(`DELETE FROM f_files WHERE f_a_email like "${fileId}"`, err => {
        if (err) throw err;
        //res.json({link: `${req.get("host")}/${file.newFilename}`});
    });
}

console.debug("debug: 1");
