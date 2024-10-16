const mongoose = require('mongoose');

const domaininputsSchema = new mongoose.Schema({
  userId: { type: Number, required: true },       // Required user ID field
  interests: { type: String, required: false },   // Optional interests field
  pastExperience: { type: String, required: false }, // Optional past experience field
  skills: { type: String, required: false },      // Optional skills field
});

const domaininputs = mongoose.model('domaininputs', domaininputsSchema);

module.exports = domaininputs; // Ensure the schema is exported correctly
