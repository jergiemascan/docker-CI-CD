const express = require("express");
const app = express();
app.get("/", function (req, res) {
    res.status(200).send({ message: "Hello from backend" });
});

module.exports = app;
