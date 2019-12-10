//Dummy router testing if routes are private using verify
const router = require('express').Router();
const verify = require('./verifyToken');


router.get('/', verify, (req, res) => {
    res.json({posts: {title: 'my-first-post', description: 'CANT TOUCH THIS'}})
})



module.exports = router;