const express = require("express");
const app = express();
const path = require("path");

function start() {
    app.get("/:fileId", (req, res) => {
        const fileId = req.params.fileId;
        db.get(`SELECT * FROM f_files WHERE f_id = "${fileId}"`, (err, row) => {
            if (err) throw err;
            res.sendFile(path.join(__dirname, "uploaded_files", fileId));
            res.attachment(row.f_name);
        });
    });
    
    app.listen(420, () => {
        console.log("[FileServer] Download Online");
    });
}

module.exports = {start};
