var mongoose = require("mongoose");

var options = {
  connectTimeoutMS: 5000,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(
  "mongodb+srv://admin:azerty123@cluster0.7sij3.mongodb.net/mening?retryWrites=true&w=majority",
  options,
  function (err) {
    console.log(err);
  }
);

module.exports = mongoose;
