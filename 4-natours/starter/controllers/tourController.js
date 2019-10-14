const Tour = require('../models/tourModel');

exports.getAlltours = (req, res) => {
  console.log(req.requestTIme);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTIme
    /*     results: tours.length,
    data: {
      tours: tours
    } */
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1; //Trick to convert from string(number) to number;
  /*   const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  }); */
};

exports.createTour = async (req, res) => {
  try {
    /*   const newTour = new Tour({});
  newTour.save(); */
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent'
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>'
    }
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
