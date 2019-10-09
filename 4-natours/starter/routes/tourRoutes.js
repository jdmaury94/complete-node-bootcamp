const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

router.param('id', tourController.checkID);

//Create a checkBody middleware
//Check if body contains the name and price property
//If not send 400 as a response (bad request)
//Add it to the post handler stack

//2) ROUTE HANDLERS

router
  .route('/')
  .get(tourController.getAlltours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
