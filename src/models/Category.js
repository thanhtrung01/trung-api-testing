const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    nameCategory: {
        type: String,
        required: true,
        unique: true,
        // trim: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamp: true,
}, );

module.exports = mongoose.model('Category', CategorySchema);