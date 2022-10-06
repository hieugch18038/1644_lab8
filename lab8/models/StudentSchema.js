const mongoose = require("mongoose");
var studentSchema = mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    image: String,
    address: String,
});

var studentModel = mongoose.model("student", studentSchema, "student");

module.exports = studentModel;