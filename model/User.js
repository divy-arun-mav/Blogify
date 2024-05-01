const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Photo: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
    }
})

module.exports = mongoose.model("USER", userSchema);