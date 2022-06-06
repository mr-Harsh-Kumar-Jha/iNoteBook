const express = require('express');
const router = express.Router();
const user = require('../modules/User');

router.post('/',(req, res)=> {
   console.log(req.body);
   const User = user(req.body);
   res.send(req.body);
   User.save();
})
module.exports = router;

// if we are using post then there is no chance of getting out details featched from log files while doing http request where as their is high chance of getting our data leaked through log files when throwing get request..
