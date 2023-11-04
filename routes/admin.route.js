const { Router } = require("express");
const {adminController} = require('../controllers/admin.controller')
const adminMiddleware = require('../models/middlewares/admin.middleware')
const router = Router();

router.post('/adminAuth', adminController.registerAdmin)
router.post('/adminLogin',  adminController.loginAdmin)
router.get('/adminUsers', adminController.getAdmins )
module.exports = router