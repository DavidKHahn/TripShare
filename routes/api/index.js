const router = require("express").Router();
const userRoutes = require("./users");

// routes from users.js
router.use("/users", userRoutes);

module.exports = router;