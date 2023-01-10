const { response } = require('express');
const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carsController');
const bookingController = require('../controllers/bookingController');
const stripeController = require('../controllers/stripeController');


// C A R S

router.post('/addcar',carsController.addcar);
router.get('/getallcars',carsController.getallcar);
router.post('/editcar',carsController.editcar)
router.post('/deletecar',carsController.deletecar)

// B O O K I N G S

router.get('/getallbookings', bookingController.getallbookings);
router.post('/cancelbooking',bookingController.cancelbooking)

// P A Y M E N T

router.post('/bookcar',stripeController.booking);

// PROFILE


module.exports = router;