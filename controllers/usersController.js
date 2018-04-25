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
      .create(req.body.userData)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
