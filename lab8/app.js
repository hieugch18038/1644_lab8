//module import
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

//database connect + access
const mongoose = require("mongoose");
const studentModel = require("./models/StudentSchema");
//url connection string db
const url = "mongodb://localhost:27017/greenwich";
//const url = "mongodb+srv://admin:admin@cluster0.nrru4jv.mongodb.net/greenwich"
mongoose.connect(url, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connect to db succeed !");
  }
});

//body-parser: get form input
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//render ra form add
app.get("/add", (req, res) => {
  res.render("add");
});

//nhận và xử lý dữ liệu từ form add
app.post("/add", (req, res) => {
    //console.log(req.body);
    //res.send(req.body);
    //res.render("output", { student: req.body });
  
    //tạo object student chứa dữ liệu nhập từ form
    var student = new studentModel({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      image: req.body.image,
    });
    //lưu object student vào database
    student.save((err) => {
      if (err) {
        console.error(err);
      } else {
        res.redirect("/student");
      }
    });
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/login", (req, res) => {
    res.render("login");
});
app.post("/login", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var check = "Login failed";
    if (username == "admin" && password == "123456") {
        check = "Login succeed";
    }
    //res.send(check)
    res.render("check", {result: check});
});

app.get("/student", (req, res) => {
    studentModel.find((err, data) => {
        if (err) {
            console.log(err);
        }else {
            //1. show dữ liệu ra console log
            //console.log(data);
            //2. show dữ liệu ra web bằng "send"
            //res.send(data);
            //3. show dữ liệu ra view bằng "render"
            res.render("student", {students: data});
        }
    });
});

app.listen(port);
