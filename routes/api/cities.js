const router = require("express").Router();


// example 
const citiesController = require("../../controllers/citiesController");

// Code router routes to controllers
router.route("/create")
.get(citiesController.findAll)
.post(citiesController.create);

// Matches with "/api/users/:id"
router
.route("/api/cities/:id")
.get(citiesController.findById)
.put(citiesController.update)
.delete(citiesController.remove);





module.exports = router;