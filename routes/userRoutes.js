const express = require("express");
const router = express.Router();
const { createUser, validateUser } = require("../controllers/userController");

// Route for registering a new user
router.post("/register", createUser);

// Route for validating user (login)
router.post("/login", validateUser);

module.exports = router;
