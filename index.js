var express = require("express");
var bodyParser = require("body-parser");

// model
var User = require("./app/models/user");
var Region = require("./app/models/region");
var Beacon = require("./app/models/beacon");

var users = [];

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
    .route("/users")
    .post(function (req, res) {
        var user = new User();

        user.name = req.body.name;
        users.push(user);

        res.json({
            message: 'user ' + user.name + ' created'
        });


    })
    .get(function (req, res) {
        res.json(users);
    });

router
    .route("/users/:user_id")
    .get(function (req, res) {
        var user = users.find(function (user) {
            return user.name === req.params.user_id;
        });

        res.json(user);
    });

app.use("/api", router);
app.listen(port);


console.log("carmen api started on port", port);