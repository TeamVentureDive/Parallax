const webserver = require("../serve/webserver");
const app = webserver.app;
const path = require("path");
const dbc = require("../connectDb");

app.get("/download/:fileId", (req, res) => {
    const fileId = req.params.fileId;
    dbc.db.get(`SELECT * FROM f_files WHERE f_id = "${fileId}"`, (err, row) => {
        if (err) throw err;
        if (!row) return;
        res.sendFile(path.join(__dirname, "uploaded_files", fileId));
        res.attachment(row.f_name);
    });
});

app.listen(420, () => console.log("[FileServer] Download Online"));
