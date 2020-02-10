const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const ProductSchema = new mongoose.Schema({
    createdAt: {
        index: true,
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    brand: {
        type: String
    },
    title: {
        type: String
    },
    reviewScore: {
        type: Number
    }
}, { collection: 'product' });

module.exports.schema = ProductSchema;