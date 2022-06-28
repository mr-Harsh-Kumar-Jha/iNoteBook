const connectToMongo = require('./db');
const express = require('express');
// var bodyParser = require('body-parser');

// create application/json parser
// var jsonParser = bodyParser.json()

// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
connectToMongo();


const app = express()
const port = 4000;

// in order to access the body of request we have to bring middleware in between i.e we have to use app.use(express.json());  this is defining that use the json file for input method as a req body.
app.use(express.json());    // middleware consists of three things request, response and next which helps in authenticating (and other usage) the code written by us and it call the 'next ' function which calls the actual route. if something is validated we directly send the response 'bad req'

// creating end points
app.use('/api/auth', require('./routers/auth'));
app.use('/api/notes',require('./routers/notes'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})