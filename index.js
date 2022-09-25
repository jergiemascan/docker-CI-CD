const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerDocument = require("./swagger.json");
const express = require("express");
const app = require("./app");
const path = require("path");
const dotEnv = require("dotenv");
dotEnv.config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());

const auths = require("./routes");
app.use("/", auths);

// app.get("/", function (req, res) {
//     res.status(200).send({ message: "Hello from backend" });
// });
console.log("Hello from this is JijiKinos container test");

const swaggerDoc = swaggerJsDoc(swaggerDocument);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const db = async () => {
    try {
        mongoose.connect(process.env.DATABASE);
        console.log("Connected to DB");
    } catch (e) {
        console.log(e);
    }
};
db();

const PORT = process.env.PORT || 3002;
app.listen(`${PORT}`, () => {
    console.log(`Hello from backend server 👋🏻 listening on port ${PORT}`);
});
