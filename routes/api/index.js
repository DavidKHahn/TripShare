const router = require("express").Router();
const userRoutes = require("./users");
const citiesRoutes = require("./cities");

// routes from users.js
router.use("/users", userRoutes);

router.use("/create", citiesRoutes);

module.exports = router;