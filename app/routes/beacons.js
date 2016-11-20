var express = require('express');
var Region = require('../models/beacon');

var router = express.Router();

router
    .route('/')
    .get(function (req, res) {
        res.send("beacons");
    });

module.exports = router;