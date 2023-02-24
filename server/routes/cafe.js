const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send([
        {
            id: '1',
            name: 'The coffee house',
            description: 'Coffee',
            employees: 1000,
            logo: '',
            location: 'Vietnam'
        }
    ]);
});

module.exports = router;
