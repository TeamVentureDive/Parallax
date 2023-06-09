const formidable = require("formidable");
const path = require("path");
const webserver = require("../serve/webserver");
const app = webserver.app;
const fs = require("fs");
const dbc = require("../connectDb");
const urlHostname = "localhost";

app.post("/upload", async (req, res) => {
    const form = new formidable.IncomingForm({uploadDir: path.join(__dirname, "uploaded_files")});
    form.parse(req, async (err, fields, files) => {
        if (err) throw err;
        res.status(200).setHeader("Content-Type", "application/json");
        if (files.upload?.length) {
            for (let i = 0; i < files.upload.length; i++) {
                //uploadFile(res, fields, files.upload[i]);
                dbc.db.get(`SELECT * FROM a_accounts WHERE a_email LIKE "${fields.email}" AND a_password LIKE "${fields.password}"`, async (err, accountRow) => {
                    if (err) throw err;
                    if (!accountRow) {
                        fs.unlinkSync(path.join(__dirname, "uploaded_files", files.upload[i].newFilename));
                        removeFromDatabase(files.upload[i].newFilename);
                        res.status(401).json({upload:"blocked"});
                        console.log(`[FileServer-Upload] Blocked Upload of File "${files.upload[i].originalFilename}" due to wrong credentials`);
                        return;
                    }
                    addToDatabase(files.upload[i], fields.email);
                    setTimeout(() => {
                        fs.unlinkSync(path.join(__dirname, "uploaded_files", file.newFilename));
                        removeFromDatabase(files.upload[i].newFilename);
                    }, 3600000);
                    res.send(JSON.stringify({uploadLink: `http://${urlHostname}:420/download/${files.upload[i].newFilename}`}));
                    console.log(`[Fileserver-Upload] ${fields.email} uploaded file "${files.upload[i].originalFilename}" as "${files.upload[i].newFilename}"`);
                });
                res.send(JSON.stringify({uploadLink:  `http://${urlHostname}:420/${file.newFilename}`}));
            }
            return;
        }
        //uploadFile(res, fields, files.upload); // New Implementation
        dbc.db.get(`SELECT * FROM a_accounts WHERE a_email LIKE "${fields.email}" AND a_password LIKE "${fields.password}"`, async (err, accountRow) => {
            if (err) throw err;
            if (!accountRow) {
                fs.unlinkSync(path.join(__dirname, "uploaded_files", files.upload.newFilename));
                removeFromDatabase(files.upload.newFilename);
                res.status(401).json({upload:"blocked"});
                console.log(`[FileServer-Upload] Blocked Upload of File "${files.upload.originalFilename}" due to wrong credentials`);
                return;
            }
            addToDatabase(files.upload, fields.email);
            setTimeout(() => {
                fs.unlinkSync(path.join(__dirname, "uploaded_files", file.newFilename));
                removeFromDatabase(files.upload.newFilename);
            }, 3600000);
            res.send(JSON.stringify({uploadLink: `http://${urlHostname}:420/download/${files.upload.newFilename}`}));
            console.log(`[Fileserver-Upload] ${fields.email} uploaded file "${files.upload.originalFilename}" as "${files.upload.newFilename}"`);
        });
        /*res.send(JSON.stringify({uploadLink: `http://${urlHostname}:420/download/${files.upload.newFilename}`}));
        console.log(`[Fileserver-Upload] ${fields.email} uploaded file "${files.upload.originalFilename}" as "${files.upload.newFilename}"`);*/
    });
});

//app.listen(611, urlHostname);


dbc.db.all(`SELECT * FROM f_files`, (err, rows) => {
    rows.forEach(element => {
        setTimeout(() => {
            removeFromDatabase(element.f_id);
            fs.unlinkSync(path.join(__dirname, "uploaded_files", element.f_id));
        }, 3600000);
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
        addToDatabase(files.data, fields.email);
        setTimeout(() => {
            fs.unlinkSync(path.join(__dirname, "uploaded_files", file.newFilename));
            removeFromDatabase(file.newFilename);
        }, 3600000);
    });
}

function addToDatabase(file, email) {
    dbc.db.run(`INSERT INTO f_files values ("${file.newFilename}", "${file.originalFilename}", "${email}" ,"${Date.now()}")`, err => {
        if (err) throw err;
    });
}

function removeFromDatabase(fileId) {
    dbc.db.run(`DELETE FROM f_files WHERE f_a_email like "${fileId}"`, err => {
        if (err) throw err;
    });
}
