const formidable = require("formidable");
const express = require("express");
const fs = require("fs");
const app = express();
const port = 1234;

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");    
    let data = fs.readFileSync("temp.html");
    
    res.send(data);
});

app.post("/upload", (req, res) =>{
    const form = formidable({});

    form.parse(req, (err, fields, files) => {
        console.log(err);
        console.log(fields);
        console.log(files);
        res.send(files);
    });
});

app.listen(port, () => {
    console.log("[FileServer] Online");
});