const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  username: { type: String, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model('Score', ScoreSchema);
