var express = require('express');
var User = require('../models/user');

var router = express.Router();

router
    .route('/')
    .post(function (req, res) {
        var user = new User();

        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname,
        user.login = req.body.login;

        user.save(function (err) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({
                    message: 'user ' + user.login + ' created'
                });
            }
        });


    })
    .get(function (req, res) {
        User.find(function(err, users) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(users);
            }
        });
    });

router
    .route('/:user_id')
    .get(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(user);
            }
        });
    })
    .put(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.send(err);
            }
            else if (user) {
                user.firstname = req.body.firstname;
                user.lastname = req.body.lastname;
                user.login = req.body.login;

                user.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.json({
                            message: 'user ' + user.login + ' updated'
                        });
                    }
                });
            }
            else {
                res
                    .status(404)
                    .json({
                        message: 'user not found: ' + req.params.user_id
                    });
            }
        });
    })
    .delete(function (req, res) {
        User.remove({
            _id: req.params.user_id
        }, function (err, user) {

            if (err) {
                res.send(err);
            }
            else {
                res.json({
                    message: 'user deleted'
                });
            }
        });
    });

module.exports = router;