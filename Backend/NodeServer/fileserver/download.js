const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

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

const db = new sqlite3.Database("../para.db", (err) => {
    if (err) throw err;
    console.log("[FileServer] Download Connected to SQLite Database");
});