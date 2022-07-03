const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors'); // this is used to manage cross origin  flaw which restricts http request form browser.

connectToMongo();


const app = express()  // it returns various useful functions which is used to manage backend process

const port = 4000;
app.use(cors());
// in order to access the body of request we have to bring middleware in between i.e we have to use app.use(express.json());  this is defining that use the json file for input method as a req body.
app.use(express.json());    // middleware consists of three things request, response and next which helps in authenticating (and other usage) the code written by us and it call the 'next ' function which calls the actual route. if something is validated we directly send the response 'bad req'

// creating end points
app.use('/api/auth', require('./routers/auth'));
app.use('/api/notes',require('./routers/notes'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})