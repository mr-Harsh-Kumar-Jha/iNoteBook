const express = require('express');
const router = express.Router();
const user = require('../modules/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middleware/fetchuser');

const JWT_SECRET ="harshis@sigmamail";

//Rout 1: this is the first
router.post('/createuser',[
   body('name' ," Enter name with min 2 characters").isLength({min:2}),
   body('email', "Enter a valid Email Id").isEmail(),
   body('password', "ur password must be of min 5 characters").isLength({min:5})
],async (req, res)=> {
   console.log(req.body)
   const errors = validationResult(req);

   // if there are any errors, then return Bad request and the error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether the user with this email id exists already
    let User = await user.findOne({email: req.body.email});
    if(User){
       return res.status(400).json({error : "Sorry,  the user with this email already exist.."})
    }

    //this is used to encrypt our password by hashing therefore it is a hashing algo package
    const salt = await bcrypt.genSalt(10);  // salt is nothing but more secured way of storing password where sme sort of apha numerical is been provided so that even after generation of hash our password must be uniuqe as salt is added anyway between our original password.

    const secpass = await bcrypt.hash(req.body.password, salt);  // await  must be used in order to resolve call back as this npm package returns call back and we cannot move forward whithout resolving it as it is the main source through which our data is going to save in database

    // creating a new user
    User= await user.create({
      name: req.body.name,
      email: req.body.email,
      password: secpass,
    })
    const authtoken = jwt.sign(User.id , JWT_SECRET);
    // sending the body part on request to the client
    res.json(authtoken);

})

//NOTE:-  if we are using post then there is no chance of getting out details featched from log files while doing http request where as their is high chance of getting our data leaked through log files when throwing get request..

//Rout 2: this is a login endpoint
router.post('/login' , [
   body('email', "Enter a valid Email Id").isEmail(),
   body('password', "Password cannot be Blank").exists(),
],async (req ,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
         return res.status(400).json({error : errors.array()});
        }
        const {email , password} = req.body;

        try{
         let User = await user.findOne({email: email});
         if(!User){
            return res.status(400).json({error: "please try to login with correct credentials"});
         }
         const passwordcompare =await bcrypt.compare(password , User.password);
         if(!passwordcompare || !password ){
            return res.status(400).json({error: "please try to login with correct credentials"});
         }
         const data = {
            user:{
               id:User.id
            }
         }
         const authtoken = jwt.sign(data, JWT_SECRET);
         res.json({authtoken: authtoken, User});
        }catch(errors){
             console.log(errors.message);
             res.status(500).send("internal server error");
        }
})

//Rout 3: this is a getuser endpoint
router.get('/getuser' ,fetchuser, async(req ,res)=>{
        try{
           const userId =req.User.id;  //here user is the object user created in fetchuser.js
           const users = await user.findById(userId).select("-password"); //here this user is the user from module section and findById is searching for user using id and user is just returning a object with the information of user in organised and data mentioned formed.
            res.send(users);
        }catch(errors){
             console.log(errors.message);
             res.status(500).send("internal server error");
        }
 })

 //Note:1.] middleware uses all the local veriables of the funtion where it is used .
 //        2.] also note that javascript object automatically creates an object element while  defining defining the element property.
module.exports = router;