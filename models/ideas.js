const mongoose = require("mongoose");

const ideaSchema = mongoose.Schema({
  ideaName: String,
  ideaDesc: String,
  likes: Number,
  voteCount: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const ideaModel = mongoose.model("ideas", ideaSchema);

module.exports = ideaModel;
