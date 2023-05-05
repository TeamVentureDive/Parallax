const express = require("express");
const app = express();
const port = 6189;
const dbc = require('../connectDb.js');

app.get("/friend", (req, res) => {
    console.log(req);
    res.json({accept: false});
}),

app.listen(port);