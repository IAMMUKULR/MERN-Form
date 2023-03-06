const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/form_data", {
  useNewUrlParser: true,
});

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  gender: String,
  date: Date,
  image: {
    data: Buffer,
    contentType: String,
  },
});

const Form = new mongoose.model("formData", formSchema);

module.exports = Form;
