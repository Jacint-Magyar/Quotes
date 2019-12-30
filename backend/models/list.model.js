const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  items: [String]
}, {
  timestamps: true
});

const List = mongoose.model('List', schema);

module.exports = List;