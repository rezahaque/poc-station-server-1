const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user/user.controller");

router.post("/login", userController.login);
router.post("/signup", userController.signup);

router.get('/reg-user', userController.fetchRegisteredUser);

module.exports = router;