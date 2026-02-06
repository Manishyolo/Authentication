const express = require("express");
const app = express();
const AuthRouter = require("../routes/AuthRoute.js");



app.use(express.json());

app.use("/api/auth",AuthRouter);


module.exports = app