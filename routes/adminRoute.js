const express = require('express')
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');

router.get('/getallnotifications',notificationsController.getallnotifications);
router.get('/viewnotifications',notificationsController.showNotifications);
router.get('/getdashboard',notificationsController.getdashboard);
module.exports = router;