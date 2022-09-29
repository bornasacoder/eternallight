const User = require("../modals/User");
const JWT_SECRET = 'ashishsingh$123';
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");



const CreateUser = async (req, res)=>{
    let success = false;
    // if there are errors , return Bad request and the errors
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
         return res.status(400).json({ success, errors: errors.array() });
    }
    //    check whether the user with this email exists already
    try {
         let user = await User.findOne({ email: req.body.email });
         if (user) {
              return res.status(400).json({ success, errors: "sorry a user with this email already exists" });
         }
         const salt = await bcrypt.genSalt(10);
         const secPass = await bcrypt.hash(req.body.password, salt);
         //  create a new user
         user = await User.create({
              name: req.body.name,
              password: secPass,
              email: req.body.email,
         })
         const data = {
              user: {
                   id: user.id
              }
         }
         const jwtData = jwt.sign(data, JWT_SECRET);
         success = true;
         res.json({ success, jwtData });
    } catch (error) {
         console.error(error.message);
         res.status(500).send("some error occured");
    }
}


const LoggedUser = async (req, res)=>{
    let success = false;
    // if there are errors , return Bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
         let user = await User.findOne({ email })
         if (!user) {
              success = false;
              return res.status(400).json({ error: "Please try to login with correct credentials" });
         }
         const passwordCompare = await bcrypt.compare(password, user.password);
         if (!passwordCompare) {
              success = false;
              return res.status(400).json({success, error: "Please try to login with correct credentials" });

         }
         const data = {
              user: {
                   id: user.id
              }
         }
         const authtoken = jwt.sign(data, JWT_SECRET);
         success = true;
         res.json({ success, authtoken });
    } catch (error) {
         console.error(error.message);
         res.status(500).send("Internal server error");
    }
}

const GetUser = async (req, res) =>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
   } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
   }
}
const UpdateUser = async (req, res) =>{
     let success = false;
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ success, errors: errors.array() });
     }
     const {name, password} = req.body;
     const salt = await bcrypt.genSalt(10);
     const secPass = await bcrypt.hash(password, salt);
     try{
          const newUserData = {};
          if(name){newUserData.name = name;}
         if(password){newUserData.password = secPass}

          const updateUser = await User.findByIdAndUpdate(req.params.id,
               {$set: newUserData},
                {new:true});
                success=true;
          res.status(200).json({success,updateUser});        
     }catch(err){
          res.status(500).json(err);
     }
}

module.exports = {CreateUser, LoggedUser, GetUser, UpdateUser};

