var express = require('express');
var Region = require('../models/region');

var router = express.Router();

router
    .route('/')
    .post(function (req, res) {
        var region = new Region();

        region.identifier = req.body.identifier;
        region.proximityUUID = req.body.proximityUUID;
        region.major = req.body.major;
        region.minor = req.body.minor;

        region.save(function (err) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({
                    message: 'region ' + region.identifier + ' created'
                });
            }
        });
    })
    .get(function (req, res) {
        Region.find(function (err, regions) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(regions);
            }
        });
    });

router
    .route('/:region_id')
    .get(function (req, res) {
        Region.findById(req.params.region_id, function (err, region) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(region);
            }
        });
    })
    .put(function (req, res) {
        Region.findById(req.params.user_id, function (err, region) {
            if (err) {
                res.send(err);
            }
            else if (region) {
                region.identifier = req.body.identifier;
                region.proximityUUID = req.body.proximityUUID;
                region.major = req.body.major;
                region.minor = req.body.minor;

                region.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.json({
                            message: 'region ' + region.identifier + ' updated'
                        });
                    }
                });
            }
            else {
                res
                    .status(404)
                    .json({
                        message: 'region not found: ' + req.params.region_id
                    });
            }
        });
    })
    .delete(function (req, res) {
        Region.remove({
            _id: req.params.region_id
        }, function (err) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({
                    message: 'region deleted'
                });
            }
        });
    });

module.exports = router;