const express = require("express");
const app = express();
const webserver = {app: app, express: express};

app.use(express.json());

module.exports = webserver;