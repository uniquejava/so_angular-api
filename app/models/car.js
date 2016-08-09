var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var $Entity$Schema = new Schema({
  id: Number,
  plate: String,
  color: String,
  entrance: { type: Date, default: Date.now }

});

module.exports = mongoose.model('$Entity$', $Entity$Schema);
