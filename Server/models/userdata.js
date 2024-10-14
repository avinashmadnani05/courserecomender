const mongoose = require('mongoose');

const recom_websiteSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    }
});
const recom_websiteModel =mongoose.model('recom_website', recom_websiteSchema);

module.exports = recom_websiteModel