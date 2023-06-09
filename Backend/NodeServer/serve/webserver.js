const express = require("express");
const app = express();

const webserver = {app: app, express: express};

module.exports = webserver;