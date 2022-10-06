const express = require("express");
const MobileModel = require("../model/MobileSchema");
const router = express.Router();

router.get("/", (req, res) =>{
    MobileModel.find((err, data) => {
        if (!err) {
            res.render("mobile/index", {mobiles: data})
        }
    });
});
module.exports = router;