const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
//This line should be before requiring app
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('App running on port: 8000');
});
