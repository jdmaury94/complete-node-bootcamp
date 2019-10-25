const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTIme = new Date().toISOString(); //Each time
  //a request hits the server, this property will be
  //added/updated
  next();
});

//3) ROUTES
app.use('/api/v1/tours', tourRouter); //Apply tourRouter middleware to /api/v1/tours route
app.use('/api/v1/users', userRouter); //Apply userRouter middleware to /api/v1/users route

app.all('*', (req, res, next) => {
  /*   res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  }); */
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
}); //It will run for all the verbs, HTTP methods

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

//4) START SERVER

module.exports = app;
