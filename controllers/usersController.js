const db = require("../models");

// takes the models to access the database
// Example
// module.exports = {
//     findAll: function(req, res) {
//       db.Article
//         .find(req.query)
//         .sort({ date: -1 })
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     }
// }