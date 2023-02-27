const formidable = require("formidable");
const express = require("express");
const app = express();
const port = 1234;

app.post("/upload", (req, res) =>{
    const form = formidable({multiples: true});

    form.parse(req, (err, fields, files) => {
        res.json({fields, files});
    });
});

app.listen(port, () => {
    console.log("[FileServer] Online");
});