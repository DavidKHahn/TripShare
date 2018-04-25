const router = require("express").Router();


const usersController = require("../../controllers/usersController");

// Code router routes to controllers
// example// Matches with "/api/articles"
router.route("/api/users/:id")
// .get(usersController.findAll)
.post(usersController.create)
.get(usersController.findById)

// Matches with "/api/users/:id"
// router
// .route("/:id")
// .get(usersController.findById)
// .put(usersController.update)
// .delete(usersController.remove);





module.exports = router;