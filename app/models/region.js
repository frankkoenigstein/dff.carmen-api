var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RegionSchema = new Schema({
    identifier: String,
    proximityUUID: String,
    major: Number,
    minor: Number
});


module.exports = mongoose.model('Region', RegionSchema);