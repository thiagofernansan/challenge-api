const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const ProductSchema = new mongoose.Schema({
    price: Number,
    image: String,
    brand: String,
    title: String,
    reviewScore: Number
}, { collection: 'product' });

module.exports = mongoose.model('product', ProductSchema);
module.exports.productSchema = ProductSchema;