const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user/user.controller");
const checkAuth = require('../../middlewares/check-auth');

router.post("/login", userController.login);
router.post("/signup", userController.signup);

router.get('/', checkAuth, userController.fetchUsers);
router.get("/logout", userController.logout);
router.get("/reg-user", userController.fetchRegisteredUser);

router.patch("/:id", checkAuth, userController.updateUser);
router.delete('/:id', checkAuth, userController.deleteUser);

module.exports = router;