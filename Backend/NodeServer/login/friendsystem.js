const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const port = 6189;
const dbc = require('../connectDb.js');

app.get("/friend", (req, res) => {
    res.sendFile(path.join(__dirname, "temp.html"));
}),

app.listen(port);