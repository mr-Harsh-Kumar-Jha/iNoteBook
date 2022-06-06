const connectToMongo = require('./db');
const express = require('express');
// var bodyParser = require('body-parser');

// create application/json parser
// var jsonParser = bodyParser.json()

// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
connectToMongo();


const app = express()
app.use(express.json());
const port = 3000;

app.use('/api/auth', require('./routers/auth'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})