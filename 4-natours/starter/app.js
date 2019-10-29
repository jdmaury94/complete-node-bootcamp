const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTIme = new Date().toISOString(); //Each time
  //  console.log(req.headers);
  //a request hits the server, this property will be
  //added/updated
  next();
});

//3) ROUTES
app.use('/api/v1/tours', tourRouter); //Apply tourRouter middleware to /api/v1/tours route
app.use('/api/v1/users', userRouter); //Apply userRouter middleware to /api/v1/users route

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}); //It will run for all the verbs, HTTP methods

app.use(globalErrorHandler);

//4) START SERVER

module.exports = app;
