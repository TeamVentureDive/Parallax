const express = require("express");
const app = express();
const path = require("path");

app.get("/:fileId", (req, res) => {
    const fileId = req.params.fileId;
    let file;
    if (file = getFileFromFileId(fileId)) return res.statusCode = 404;
    res.send(file.path);
    res.attachment(file.name);
});

app.listen(420, () => {
    console.log("[FileServer] Download Online");
});

function getFileFromFileId(fileID) {
    // TODO
    // TRUE WENN GEFUNDEN
    // FALSE WENN NICHT
    return false;
}