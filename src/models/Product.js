const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    price: {
        type: Number,
        required: true,
    },
    newProduct: {
        type: Boolean,
        required: false,
    },
    img: {
        type: String,
        maxlength: 512,
    },
    desc: {
        type: String,
        required: false,
    },
    sale: {
        type: Boolean,
        required: false,
    },
    slug: {
        type: String,
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
});

module.exports = mongoose.model('Product', ProductSchema);