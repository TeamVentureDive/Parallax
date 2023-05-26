const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.get("/", (req, res) => {
    const rawIndexData = fs.readFileSync(path.join(__dirname, "..", "FE", "index.html"), "utf-8");
    const rawFileContainer = fs.readFileSync(path.join(__dirname, "..", "FE", "fileContainer.html"), "utf-8");
    let insertData = "";
    //GET DATA
    //URGENT!!!
    //GET DATA

    //DEBUG
    let data = [
        {
            name: "max@spenger.com",
            filename: "abc",
            filedate: 123
        },
        {
            name: "spe@muster.at",
            filename: "def",
            filedate: 4535
        },
        {
            name: "muster@deine.mom",
            filename: "dzxy",
            filedate: 45555
        }
    ]
    //DEBUG
    data.forEach(entry => {
        let tempEntry = 
        rawFileContainer
        .replace("<!--NAME_HERE-->", entry.name)
        .replace("<!--FILENAME_HERE-->", entry.filename)
        .replace("<!--FILEDATE_HERE-->", entry.filedate);
        insertData += tempEntry;
    });

    const stringToSend = rawIndexData.replace("<!--DATA_HERE-->", insertData);
    res.send(stringToSend);
});

app.listen(80);