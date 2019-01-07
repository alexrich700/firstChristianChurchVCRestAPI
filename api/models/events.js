var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    title: {
        type: String
        // required: 'Cannot be blank!'
    },
    day: {
        type: String
    },
    date: {
        type: String
        // required: 'Cannot be blank!'
    },
    time: {
        type: String
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

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;