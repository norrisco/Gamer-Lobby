const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

//Add this function to verify JWT Token for private admin routes
module.exports = function (req, res, next){
    const token = req.header('auth_token');
    if (!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.admin = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
};

