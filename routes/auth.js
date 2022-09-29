const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");
const { CreateUser, LoggedUser, GetUser, UpdateUser } = require('../controller/auth');

//Route:1 -  create a user using : POST "/api/auth/". Doesn't require /api/auth/createuser.  no login required.
router.post('/createuser', [
     body('name', 'Enter the valid name').isLength({ min: 3 }),
     body('email', 'Enter the valid email').isEmail(),
     body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
],  (req, res) => {
    CreateUser(req, res);
})
// Route: 2 - authenticate a user using: POST "/api/auth/login". no login required
router.post('/login', [
    body('email', 'Enter the valid email').isEmail(),
    body('password', 'Password cannot be blanked').exists(),
],  (req, res) => {
       LoggedUser(req, res); 
})
// Route:3 - Get loggedin user Details using : POST "/api/auth/getuser" . Login required

router.get('/getuser', fetchuser,  (req, res) => {
   GetUser(req, res);
})

router.put('/:id', [
    body('name', 'Name must be atleast 3 characters ').isLength({ min: 3 }),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
] , fetchuser , (req, res)=>{
    UpdateUser(req, res);
})

module.exports = router;