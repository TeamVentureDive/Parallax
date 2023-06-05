const formidable = require("formidable");
const path = require("path");
const app = require("../serve/webserver");
const fs = require("fs");
const dbc = require("../connectDb");
const urlHostname = "localhost";

app.post("/upload", async (req, res) => {
    const form = new formidable.IncomingForm({uploadDir: path.join(__dirname, "uploaded_files")});
    form.parse(req, async (err, fields, files) => {
        res.status(400).setHeader("Content-Type", "application/json");
        if (files.upload.length) {
            for (let i = 0; i < files.upload.length; i++) {
                uploadFile(res, fields, files.upload[i]);
                res.send(JSON.stringify({uploadLink:  `http://${urlHostname}:420/${file.newFilename}`}));
            }
            return;
        }
        uploadFile(res, fields, files.upload); // New Implementation
        res.send(JSON.stringify({uploadLink:  `http://${urlHostname}:420/download/${files.upload.newFilename}`}));
        console.log(`[Fileserver-Upload] ${fields.email} uploaded file "${files.upload.originalFilename}" as "${files.upload.newFilename}"`);
    });
});

app.listen(611, urlHostname);


dbc.db.all(`SELECT * FROM f_files`, (err, rows) => {
    rows.forEach(element => {
        setTimeout(() => {
            removeFromDatabase(element.f_id);
            fs.unlinkSync(path.join(__dirname, "uploaded_files", element.f_id));
        }, 3600000)
    });
});

console.info("[FileServer] Upload Online");

function uploadFile(res, fields, file) {
    dbc.db.get(`SELECT * FROM a_accounts WHERE a_email LIKE "${fields.email}" AND a_password LIKE "${fields.password}"`, async (err, row) => {
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
    });
}

function addToDatabase(file, email) {
    dbc.db.run(`INSERT INTO f_files values ("${file.newFilename}", "${file.originalFilename}", "${email}" ,"${new Date(Date.now()).toDateString()}")`, err => {
        if (err) throw err;
    });
}

function removeFromDatabase(fileId) {
    dbc.db.run(`DELETE FROM f_files WHERE f_a_email like "${fileId}"`, err => {
        if (err) throw err;
    });
}
