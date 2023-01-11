const express = require('express')
const authController = require('../controllers/authController');
const router = express.Router()

router.put('/login',authController.login);
router.post('/register',authController.register);
router.get('/logout', authController.logoutUser);

router.get('/requestotp',authController.requestOtp);
router.post('/varifyotp',authController.verifyOtp);

module.exports = router;