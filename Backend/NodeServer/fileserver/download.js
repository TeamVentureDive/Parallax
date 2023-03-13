const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

app.get("/:fileId", (req, res) => {
    const fileId = req.params.fileId;
    let file;
    if (!(file = getFileFromFileId(fileId))) return res.status(404);
    res.sendFile(file.path);
    res.attachment(file.name);
});

app.listen(420, () => {
    console.log("[FileServer] Download Online");
});

const db = sqlite3.Database("../para.db", (err) => {
    if (err) throw err;
    console.log("[FileServer] Download Connected to SQLite Database");
});

function getFileFromFileId(fileId) {
    db.get(`SELECT FROM f_files WHERE f_id = ${fileId}`, (err, row) => {
        if (err) throw err;
        return row;
    });
}