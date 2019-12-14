const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin');

const {registerValidation, loginValiation }  = require('../validation');

//localhost:4000/api/auth/register
router.post('/register', async (req, res) => {
    //Run the register validation, if there are errors send Joi's error message
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if user is already in database
    const userExist = await Admin.findOne({username: req.body.username});
    if(userExist) return res.status(400).send('Username alrady exists');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Saving new user
    const admin = new Admin({
        username: req.body.username,
        password: hashedPassword
    });
    try{
        const SavedAdmin = await admin.save();
        res.send(SavedAdmin)
    }catch(err){
        res.status(400).send(err);
    }
});

//login
router.post('/login', async (req, res) => {
    //run Joi validation to check format
    const {error} = loginValiation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check database for username
    const admin = await Admin.findOne({username: req.body.username});
    if(!admin) return res.status(400).send('Username is incorrect');

    //Validate password
    const validPassword = await bcrypt.compare(req.body.password, admin.password);
    if(!validPassword) return res.status(400).send('Password is incorrect');

    //SUCCESS
    //Create JWT token
    //Secret in .env file
    const token = jwt.sign({_id: admin._id, expiresIn: "10h"}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token, {expiresIn: "10h"});


    
});

module.exports = router;