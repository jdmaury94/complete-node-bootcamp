const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

console.log(__dirname);

//2) ROUTE HANDLERS

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
