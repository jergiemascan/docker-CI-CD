const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerDocument = require("./swagger.json");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());

const swaggerDoc = swaggerJsDoc(swaggerDocument);

const user = require("./routes");
app.use("/", user);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

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

const auths = require("./routes");
app.use("/auth", auths);

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
