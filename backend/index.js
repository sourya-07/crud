require("dotenv").config()
const express = require("express")
const db = require("./db/db.js")


db();
const app = express();

const PORT = process.env.PORT || 5433;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, (() => {
    console.log(`Server is running at PORT ${PORT}`)
}))