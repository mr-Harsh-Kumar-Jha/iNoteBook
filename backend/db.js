
const mongoose = require('mongoose');
const uri = "mongodb://127.0.0.1:27017/test";
//it is the replacement for " localhost " -- 127.0.0.1
const connectToMongo= ()=>{
   mongoose.connect(uri,()=>{
      console.log("MongoDB connected Successfully");
   })
}
module.exports = connectToMongo;

// issue that i was faicing was i was using "localhost" this term which is one of the slowest way of detecting our local database this result into time delay therefore we have to use the ip- address of the local host i.e 127.0.0.1 and along with port no after semicolon after ip-address.