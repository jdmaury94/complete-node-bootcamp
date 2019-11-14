const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

//1) GLOBAL MIDDLEWARES
//Set security HTTP headers
app.use(helmet());

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//Limit requests from same API
const limiter = rateLimit({
  //100 requests from the same ip in 1 hour
  max: 122,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter); //It will affect all the routes

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//Data sanitization against NoSQL query injection
app.use(mongoSanitize()); //Take a look at the whole req.body, req.query, req.params
//filter out dots and dollar signs

//Data sanitization against XSS(cross-site scripting attacks)
app.use(xss()); //Clean the user input from malicious HTML code with js included

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

//Serving static files
app.use(express.static(`${__dirname}/public`));

//Test middleware
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
app.use('/api/v1/reviews', reviewRouter); //Apply userRouter middleware to /api/v1/users route

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}); //It will run for all the verbs, HTTP methods

app.use(globalErrorHandler);

//4) START SERVER

module.exports = app;
