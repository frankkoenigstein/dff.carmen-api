var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BeaconSchema = new Schema({
    identifier: String,
    proximityUUID: String,
    major: Number,
    minor: Number,
    measuredPower: String,
    macAddress: String
});


module.exports = mongoose.model('Beacon', BeaconSchema);