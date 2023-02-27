const formidable = require("formidable");
const express = require("express");
const app = express();
const port = 1234;

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><form action="upload"><input type="file"></form></body></html>');
});

app.get("/upload", (req, res) =>{
    const form = formidable({multiples: true});

    form.parse(req, (err, fields, files) => {
        res.json({fields, files});
    });
});

app.listen(port, () => {
    console.log("[FileServer] Online");
});