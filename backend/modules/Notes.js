const mongoose = require('mongoose');
const { stringify } = require('postman-request/lib/url-parse');
const { Schema } = mongoose;

const notesSchema = new Schema({
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
   },
  Title: {
      type:String,
      required:true
  } ,
  Description: {
     type:String,
     required:true
  },
  Tag:{
   type:String,
   default:"General"
  },
  date:{
     type: Date,
     default: Date.now
  }

});

module.exports=mongoose.model('notes', notesSchema);
