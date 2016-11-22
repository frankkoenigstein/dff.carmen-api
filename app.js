var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// db
var mongoose = require('mongoose');
var dbconfig = require('./mongodb-config');
// Use native promises
mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.uri, dbconfig.options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db connected');
});

// app
var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));

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

// routes
var users = require('./app/routes/users');
var regions = require('./app/routes/regions');
var beacons = require('./app/routes/beacons');

router.use('/users', users);
router.use('/regions', regions);
router.use('/beacons', beacons);

app.use('/api', router);
app.listen(port);

console.log('carmen api started on port', port);