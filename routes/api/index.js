const router = require("express").Router();
const userRoutes = require("./users");
// const citiesRoutes = require("./cities");

// routes from users.js
router.use(userRoutes);

// router.use(citiesRoutes);

module.exports = router;