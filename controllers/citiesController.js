// const db = require("../models");

// // Defining methods for the booksController
// module.exports = {
//   findAll: function(req, res) {
//     db.City
//       .find(req.query)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   findById: function(req, res) {
//     db.City
//       .findById(req.params.id)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   create: function(req, res) {
//     console.log("this is cities controller: ", JSON.stringify(req.body))
//     db.City
//       .create(req.body)
//       .then(dbModel => {
//         return db.User.findOneAndUpdate({ token: req.body.token }, { $push: { cities: dbModel._id } }, { new: true }); 
//         res.json(dbModel)
//       })
//       .catch(err => res.status(422).json(err));
//   },
//   update: function(req, res) {
//     db.City
//       .findOneAndUpdate({ _id: req.params.id }, req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   remove: function(req, res) {
//     db.City
//       .findById({ _id: req.params.id })
//       .then(dbModel => dbModel.remove())
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   findDetailById: function(req, res) {
//     //console.log(req.params.id)
//     db.City.findById(req.params.id)
//       .populate("details")
//       .then(function(dbUserDetails) {
//         res.json(dbUserDetails)
//       })
//       .catch(function(err) {
//         // If an error occurs, send it back to the client
//         res.json(err);
//       });
//   }
// };
