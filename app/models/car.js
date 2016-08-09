var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarSchema = new Schema({
    id: Number,
    plate: String,
    color: String,
    entrance: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Car', CarSchema);