var express = require("express");
var router = express.Router();

var uid2 = require("uid2");
var bcrypt = require("bcrypt");

var userModel = require("../models/users");
var boardModel = require("../models/board");
var ideaModel = require("../models/ideas");

router.post("/sign-up", async function (req, res, next) {
  var error = [];
  var result = false;
  var saveUser = null;
  var token = null;
  console.log(req.body);
  const data = await userModel.findOne({
    email: req.body.emailFromFront,
  });

  if (data != null) {
    error.push("utilisateur déjà présent");
  }

  if (
    req.body.usernameFromFront == "" ||
    req.body.emailFromFront == "" ||
    req.body.passwordFromFront == ""
  ) {
    error.push("champs vides");
  }

  if (error.length == 0) {
    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10);
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: hash,
      token: uid2(32),
      premium: false,
    });

    saveUser = await newUser.save();

    if (saveUser) {
      result = true;
      token = saveUser.token;
    }
  }

  res.json({ result, user: saveUser, error, token });
});

router.post("/sign-in", async function (req, res, next) {
  var result = false;
  var user = null;
  var error = [];
  var token = null;

  if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
    error.push("champs vides");
  }

  if (error.length == 0) {
    user = await userModel.findOne({
      email: req.body.emailFromFront,
    });

    if (user) {
      if (bcrypt.compareSync(req.body.passwordFromFront, user.password)) {
        result = true;
        token = user.token;
      } else {
        result = false;
        error.push("mot de passe incorrect");
      }
    } else {
      error.push("email incorrect");
    }
  }

  res.json({ result, user, error, token });
});
// creation d'un board
router.post("/board-creation", async function (req, res, next) {
  var result = false;
  var user = await userModel.findOne({ token: req.body.token });

  if (user != null) {
    var newBoard = new boardModel({
      boardName: req.body.title,
      boardDesc: req.body.desc,
      userId: user._id,
    });
  }

  var saveBoard = await newBoard.save();
  if (saveBoard.title) {
    result = true;
  }

  res.json({ result, saveBoard });
});

router.get("/board/:token", async function (req, res, next) {
  var boards = [];
  var user = await userModel.findOne({ token: req.params.token });
  console.log(req.params.token, ":token utilisateur");

  if (user != null) {
    boards = await boardModel.find({ userId: user._id });
  }
  console.log(boards, "les boards");

  res.json({ boards });
});
// recuperation d'un board avec son id et recuperer tout le contenu de la clé étrangere ideaId
router.get("/myboard/:id", async function (req, res, next) {
  var board = await boardModel
    .find({ _id: req.params.id })
    .populate("ideaId")
    .exec();

  res.json({ board });
});

// creation de l'idée
router.post("/idea-creation", async function (req, res, next) {
  var result = false;
  var user = await userModel.findOne({ token: req.body.token });

  if (user != null) {
    var newIdea = new ideaModel({
      ideaName: req.body.idea,
      ideaDesc: req.body.ideaDesc,
      likes: req.body.likesFromFront,
      voteCount: req.body.voteCountFromFront,
      userId: user._id,
    });
  }
  console.log(req.body, "test reqbody");
  var saveIdea = await newIdea.save();
  var board = await boardModel.findOne({ _id: req.body.boardId }); //recuperation de l'id du board sur lequel on crée l'idée
  if (saveIdea.ideaName) {
    console.log(board, "test board");
    board.ideaId.push(saveIdea._id); //push l'id de l'idée dans le tableau de clé étrangère ideaId du board
    board.save();
    result = true;
  }

  res.json({ result, saveIdea });
});

//suppresion d'une idée
router.delete("/delete-idea/:ideaId", async function (req, res, next) {
  var deleteIdea = await ideaModel.deleteOne({ _id: req.params.ideaId });

  var modifyIdeaOnBoard = await boardModel
    .findOneAndUpdate(
      { ideaId: { $in: { _id: req.params.ideaId } } },
      { $pull: { ideaId: req.params.ideaId } },
      { new: true }
    )
    .populate("ideaId");

  res.json({ modifyIdeaOnBoard });
});

//compteur de vote//
router.put("/idea-modification/:Id", async function (req, res, next) {
  var searchIdea = await ideaModel.findOne({ _id: req.params.Id });

  var result = false;
  if (searchIdea && req.body.action == "like") {
    searchIdea.likes = searchIdea.likes + 1;
    searchIdea.voteCount = searchIdea.voteCount + 1;
    await searchIdea.save();
    result = true;
  }
  if (searchIdea && req.body.action == "dislike") {
    searchIdea.likes = searchIdea.likes - 1;
    searchIdea.voteCount = searchIdea.voteCount + 1;
    await searchIdea.save();
    result = true;
  }

  var searchBoardCompteur = await boardModel
    .findOne({
      ideaId: { $in: { _id: req.params.Id } },
    })
    .populate("ideaId");

  res.json({ result, searchBoardCompteur });
});

module.exports = router;
