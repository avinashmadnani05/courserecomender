const mongoose = require('mongoose');

const domaininputsSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  interests: { type: String, required: false },
  pastExperience: { type: String, required: false },
  skills: { type: String, required: false },
});

const domaininputs = mongoose.model('domaininputs', domaininputsSchema);

module.exports = domaininputs;
