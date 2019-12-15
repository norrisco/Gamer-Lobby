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
}
// dotenv.config();
// const verifyToken = async (req, res, next) => {
//   const token = req.cookies.token || '';
//   try {
//     if (!token) {
//       return res.status(401).json('You need to Login')
//     }
//     const decrypt = await jwt.verify(token, process.env.JWT_SECRET);
//     req.user = {
//       id: decrypt.id,
//       firstname: decrypt.firstname,
//     };
//     next();
//   } catch (err) {
//     return res.status(500).json(err.toString());
//   }

// };

