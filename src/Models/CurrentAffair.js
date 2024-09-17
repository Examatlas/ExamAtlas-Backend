const mongoose = require('mongoose');

const CurrentAffairSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    keyword: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        default: null  // Image is optional
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CurrentAffair', CurrentAffairSchema);
