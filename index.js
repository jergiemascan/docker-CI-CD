const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());

console.log("Hello from this is JijiKinos container test");

if (
    process.env.NODE_ENV === "staging" ||
    process.env.NODE_ENV === "production"
) {
    app.use(express.static(path.join(__dirname, "frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "frontend/build/index.html"));
    });
}

mongoose
    .connect(
        // "mongodb+srv://jiji:123ads@cluster0.dy4vwha.mongodb.net/?retryWrites=true&w=majority"

        "mongodb://localhost:27017/"
    )
    .then(con => {
        console.log("Connected to DB");
    });

const PORT = process.env.PORT || 3001;
app.listen(`${PORT}`, () => {
    console.log(`Hello from backend server 👋🏻 listening on port ${PORT}`);
});
