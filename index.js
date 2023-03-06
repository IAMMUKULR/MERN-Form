const express = require("express");
// const bodyParser = require("body-parser");
const Form = require("./database.js");
const cors = require("cors");
const multer = require("multer");

const Router = express();
Router.use(express.static(__dirname + "./uploads"));

// Router.use(bodyParser.urlencoded({ extended: true }));

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("testImage");

Router.use(express.json());
Router.use(cors({ origin: "http://localhost:3000" }));

Router.route("/")
  .get(function (req, res) {
    Form.find(function (err, foundUser) {
      if (!err) {
        res.send(foundUser);
      } else {
        res.send(err);
      }
    });
  })

  .post(upload, function (req, res) {
    console.log(req.body);

    const newUser = new Form({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      gender: req.body.gender,
      image: {
        data: req.file.fieldname,
        contentType: "image/png",
      },
      date: new Date(),
    });

    newUser.save(function (err) {
      if (!err) {
        res.send({ respronse: "Data Saved Successfully!" });
      } else {
        res.send(err);
      }
    });
  });

Router.route("/:name").get(function (req, res) {
  Form.findOne({ name: req.params.name }, function (err, foundUser) {
    if (!err) {
      res.send(foundUser);
    } else {
      res.send(err);
    }
  });
});

Router.listen(3001, function () {
  console.log("Server running on 3001");
});
