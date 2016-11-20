var express = require('express');
var Region = require('../models/region');

var router = express.Router();

router
    .route('/')
    .get(function (req, res) {
        res.send("regions");
    });

module.exports = router;