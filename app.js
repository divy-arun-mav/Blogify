const express = require('express');
const app = express()
const port = 5000;
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");
const cors = require("cors");

app.use(cors())
require('./model/User')
require('./model/Post')
app.use(express.json())
app.use(require("./routes/routes"))

mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
    console.log("successfully connected to mongo")
})

mongoose.connection.on("error", () => {
    console.log("not connected to mongodb")
})

app.listen(port, () => {
    console.log("server is running on port" + " " + port)
})
