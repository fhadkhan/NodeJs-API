const express = require('express');
let router = express.Router();

router.all('/', (req, res) => {
    res.json({message: 'Welcome to our API.'});
});

module.exports = router;