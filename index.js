var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

// db
var mongoose = require('mongoose');
mongoose.connect('mongodb://9tx3tkwzw2ymrbzx.myfritz.net:27017', {
    server: {
        ssl: true
    }
});

// Use native promises
mongoose.Promise = global.Promise;

// model
var User = require('./app/models/user');
var Region = require('./app/models/region');
var Beacon = require('./app/models/beacon');

// rest
var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

router.use(function (req, res, next) {
    // do logging
    console.log('something is happening');

    // make sure we go to the next routes and don't stop here'
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});


// users
router
    .route('/users')
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
    .route('/users/:user_id')
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

app.use('/api', router);
app.listen(port);


console.log('carmen api started on port', port);