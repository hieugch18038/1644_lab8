var mongoose = require("mongoose");
var schema = mongoose.Schema;
var model = mongoose.model;

var MobileSchema = schema(
    {
        name: String,
        brand: String,
        image: String,
        price: Number,
    }
)
var MobileModel = mongoose.model("dien thoai", MobileSchema, "mobile");
module.exports = MobileModel;