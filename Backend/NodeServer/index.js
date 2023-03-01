const formidable = require("formidable");
const path = require("path");
const express = require("express");
const fs = require("fs");
const app = express();
const port = 1234;

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");    
    fs.readFile("temp.html", (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});

app.post("/upload", (req, res) =>{
    const form = new formidable.IncomingForm({uploadDir: path.join(__dirname, "uploaded_files")});
    console.log(form);

    form.parse(req, (err, fields, files) => {
        console.log(files.upload);
    });
    res.send("sent");
});

app.listen(port, () => {
    console.log("[FileServer] Online");
});