const express = require('express');
const app = express();
app.use(express.json());
const port = 8000;
const fs = require('fs');
/*app.get('/', (req, res) => {
  //res.status(200).send('Hello from the server side!');
  res
    .status(200)
    .json({ message: 'Hello from the server side!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint');
});*/
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  });
});
console.log(tours);
app.get('/api/v1/tours/:id', (req, res) => {
  //console.log(req.params);
  //const tour = tours[req.params.id];
  const id = req.params.id * 1; //Trick to convert from string(number) to number;
  const tour = tours.find(el => el.id === id);

  //if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
});

app.post('/api/v1/tours', (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body); //Merge multiple objects
  tours.push(newTour); //Add a new tour to Tours Object
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours), //data that we want to write
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
});

app.listen(port, () => {
  console.log('App running on port: 8000');
});
