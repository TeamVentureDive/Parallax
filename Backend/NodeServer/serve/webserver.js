const express = require("express");
const app = express();
const path = require("path")
const bodyParser = require("body-parser");

//app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join("..", "..", "..", "Frontend")));

const webserver = {app: app, express: express};

module.exports = webserver;