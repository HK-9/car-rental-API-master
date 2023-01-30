const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carsController')
console.log('ethis')
router.get('/getallcars',carsController.getallcar)
module.exports = router;