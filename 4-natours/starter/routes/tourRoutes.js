const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

//router.param('id', tourController.checkID); // To define param middleware

//Create a checkBody middleware
//Check if body contains the name and price property
//If not send 400 as a response (bad request)
//Add it to the post handler stack

//2) ROUTE HANDLERS

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAlltours);

router
  .route('/')
  .get(tourController.getAlltours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
