const router = require("express").Router();


const usersController = require("../../controllers/usersController");

// Code router routes to controllers
// example// Matches with "/api/articles"
router.route("/api/users/:id")
// .get(usersController.findAll)
.post(usersController.create)


router.route("/api/users/:username")
.get(usersController.findUser)

// Matches with "/api/users/:id"
// router
// .route("/:id")
// .get(usersController.findById)
// .put(usersController.update)
// .delete(usersController.remove);

router.route("/api/user")
// .get(usersController.findAll)
.post(usersController.create)
.get(usersController.findById)
.put(usersController.updateUserToken)

router.route("/api/create")
// .get(usersController.findAll)
.post(usersController.updateCity);

router.route("/userdata/:id")
.get(usersController.getUserData);

router.route("/api/users")
.get(usersController.getUsers)

router.route("/api/place")
.put(usersController.deletePlace)

router.route("/api/userdata/:name")
.get(usersController.getUserByName);

router.route("/api/user/:token")
.get(usersController.getCurrentUser)

router.route("/api/city")
.put(usersController.deleteCity)










module.exports = router;