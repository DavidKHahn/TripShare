const db = require("../models");
const mongoose = require("mongoose");

// Defining methods for the booksController
module.exports = {
  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log("this is users controller: ", JSON.stringify(req.body))
    db.User
      .create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      token: req.body.token
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => 
        {
          console.log(err)
          res.status(422).json(err)
        });
  },
  findUser: function (req, res) {
    console.log(req.params.username)
    db.User
      .findOne({ username: req.params.username })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateUserToken: function (req, res) {
    //console.log("usertoken",req.body)
    db.User
      .findOneAndUpdate({ username: req.body.userInfo.username }, { token: req.body.userInfo.token })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateCity: function (req, res) {
    //console.log("this is cities controller: ", JSON.stringify(req.body))
    db.User
      .findOneAndUpdate(
        { token: req.body.cityData.token },
        { $push: { cities: { location: req.body.cityData.location, coordinates: req.body.cityData.coordinates } } },
        { new: true }
      )
      .then(dbModel => {
        res.json(dbModel)
      })
      .catch(err => {
        console.log(err)
        res.status(422).json(err)});
  },
  getUserData: function (req, res) {
    db.User
      .findOne({ token: req.params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(422).json(err));
  },
  getUsers: function (req, res) {
    db.User
      .find({})
      .then(dbUsers => res.json(dbUsers))
      .catch(err => res.status(422).json(err));
  },
  getUserByName: function (req, res) {
    console.log("req body", req.body)
    db.User
      .findOne({ name: req.params.name })
      .then(dbUsers => res.json(dbUsers))
      .catch(err => res.status(422).json(err));
  },
  deletePlace: function(req, res) {
    console.log(req.body.detailsId)
    db.User
      .findOneAndUpdate(
        { "cities._id": req.body.citiesId },
        { $pull: { "cities.$.details": { "_id": req.body.detailsId } } }, 
        { new: true }
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getCurrentUser: function (req, res) {
    db.User
      .findOne({ token: req.params.token })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(422).json(err));
  },
  deleteCity: function(req, res) {
    console.log(req.body.detailsId)
    db.User
      .findOneAndUpdate(
        { token: req.body.userId },
        { $pull: { cities: { _id: req.body.citiesId } } }, 
        { new: true }
      )
      .then(dbModel => res.json(dbModel))
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
