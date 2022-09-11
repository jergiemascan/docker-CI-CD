const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerDocument = require("./swagger.json");
const express = require("express");
const app = express();
const path = require("path");
const dotEnv = require("dotenv");
dotEnv.config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());

const auths = require("./routes");
app.use("/auth", auths);

app.get("/home", function (req, res) {
    res.status(200).send({ message: "Hello from backend" });
});

const swaggerDoc = swaggerJsDoc(swaggerDocument);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

console.log("Hello from this is JijiKinos container test");
// if (
//     process.env.NODE_ENV === "staging" ||
//     process.env.NODE_ENV === "production"
// ) {
//     app.use(express.static(path.join(__dirname, "frontend/build")));
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname + "frontend/build/index.html"));
//     });
// }

console.log(process.env.PORT);
const db = async () => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("Connected to DB");
    } catch (e) {
        console.log(e);
    }
};
db();
const PORT = process.env.PORT || 3001;
app.listen(`${PORT}`, () => {
    console.log(`Hello from backend server 👋🏻 listening on port ${PORT}`);
});
