const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");
const authMiddleware = require("../models/middlewares/auth.middleware");
const router = Router();

router.post('/auth', usersController.registerUser)
router.post('/login',  usersController.login)
router.get('/users', usersController.getUsers )
module.exports = router