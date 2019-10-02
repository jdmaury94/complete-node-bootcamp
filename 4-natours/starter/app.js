const express = require('express');
const app = express();
const port = 8000;
app.get('/', (req, res) => {
  //res.status(200).send('Hello from the server side!');
  res
    .status(200)
    .json({ message: 'Hello from the server side!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint');
});

app.listen(port, () => {
  console.log('App running on port: 8000');
});
