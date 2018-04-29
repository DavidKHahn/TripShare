const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("this is users controller: ", JSON.stringify(req.body))
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findUser: function(req, res) {
    console.log(req.params.username)
    db.User
      .findOne({ username: req.params.username })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateUserToken: function(req, res) {
    //console.log("usertoken",req.body)
    db.User
    .findOneAndUpdate({ username: req.body.userInfo.username}, { token: req.body.userInfo.token })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  updateCity: function(req, res) {
    //console.log("this is cities controller: ", JSON.stringify(req.body))
    db.User
      .findOneAndUpdate(
        { token: req.body.cityData.token },
        { $addToSet: { cities: req.body.cityData } }, 
        { new: true }
      )
      .then(dbModel => {
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  getUserData: function(req, res) {
    db.User
      .findOne({ token: req.params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(422).json(err));
  },
  getUsers: function (reg, res) {
    db.User
      .findAll({})
      .then(dbUsers => res.json(dbUsers))
      .catch(err => res.status(422).json(err));
  }
  // updateDetail: function(req, res) {
  //   console.log("this is details controller: ", JSON.stringify(req.body))
  //   // db.User
  //   //   .findOneAndUpdate( {_id: { $in: [cities]}}, {$push: { cities: req.body.cityData } }, { new: true })
  //   //   .then(dbModel => {
  //   //     res.json(dbModel)
  //   //   })
  //   //   .catch(err => res.status(422).json(err));
  // }
};
