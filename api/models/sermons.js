var mongoose = require('mongoose');

var sermonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Cannot be blank!'
    },
    description: {
        type: String,
        required: 'Cannot be blank!'
    },
    video: {
        type: String,
        required: 'Cannot be blank!'
    }
});

var Sermons = mongoose.model('Sermons', sermonSchema);

module.exports = Sermons;