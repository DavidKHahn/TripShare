const router = require("express").Router();


// example 
const citiesController = require("../../controllers/citiesController.js");

// Code router routes to controllers
router.route("/api/create")
.get(citiesController.findAll)
.post(citiesController.create);

router.route("/userdata/:id")
.get(citiesController.findDetailById);

// Matches with "/api/users/:id"
router
.route("/api/cities/:id")
.get(citiesController.findById)
.put(citiesController.update)
.delete(citiesController.remove);

module.exports = router;