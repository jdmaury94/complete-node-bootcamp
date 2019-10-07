const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  //Middleware logic
  console.log('Hello from the middleware 👏');
  next();
});

app.use((req, res, next) => {
  req.requestTIme = new Date().toISOString(); //Each time
  //a request hits the server, this property will be
  //added/updated
  next();
});

//3) ROUTES
app.use('/api/v1/tours', tourRouter); //Apply tourRouter middleware to /api/v1/tours route
app.use('/api/v1/users', userRouter); //Apply userRouter middleware to /api/v1/users route

//4) START SERVER

module.exports = app;
