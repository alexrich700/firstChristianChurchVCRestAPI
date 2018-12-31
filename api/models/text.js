var mongoose = require('mongoose');

var textSchema = mongoose.Schema({
    text: {
        type: String,
        required: 'Cannot be blank!'
    },
    name: {
        type: String,
        required: 'Cannot be blank!'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

var Text = mongoose.model('Text', textSchema);

module.exports = Text;