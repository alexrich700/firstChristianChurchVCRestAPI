var mongoose = require('mongoose');

var textSchema = new mongoose.Schema({
    title: {
        type: String
        // required: 'Cannot be blank!'
    },
    date: {
        type: String
        // required: 'Cannot be blank!'
    },
    location: {
        type: String
        // required: 'Cannot be blank!'
    },
    image: {
        type: String
        // required: 'Cannot be blank!'
    }
});

var Event = mongoose.model('Event', textSchema);

module.exports = Event;