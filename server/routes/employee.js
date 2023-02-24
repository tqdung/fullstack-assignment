const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send([
        {
            id: 1,
            name: "Dzung Tran",
            email_address: "tqdungit97@gmail.com",
            phone_number: "88004297",
            days_worked: 100,
            cafe: "The coffee house"
        }
    ]);
});

module.exports = router;
