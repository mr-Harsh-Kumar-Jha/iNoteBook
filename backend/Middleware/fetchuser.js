const jwt = require('jsonwebtoken');
const JWT_SECRET ="harshis@sigmamail";

const fetchuser = (req ,res ,next) =>{
   // get the user from JWT token and add user to req object
        const token = req.header('auth-token');
        if(!token){
         res.status(404).send({error:"Please authenticate using correct token"});
        }
        try{
         const data = jwt.verify(token ,JWT_SECRET); // here signature is been verified and then authorization to data is given depending upon what type of jwt token have u given it will return u with those results.
         req.User = data.user; // req is object which is containing user as its element which is been created as its presence is absent in req
         next();
        }catch(errors){
         console.log(errors.message);
         res.status(401).send("Please authenticate using correct token");
        }
}

module.exports = fetchuser;