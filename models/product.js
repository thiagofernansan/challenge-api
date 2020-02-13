const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const ProductSchema = new mongoose.Schema({
    price: mongoose.Schema.Types.Decimal128,
    image: String,
    brand: String,
    title: String,
    reviewScore: mongoose.Schema.Types.Decimal128
}, { collection: 'product' });

module.exports = mongoose.model('product', ProductSchema);
module.exports.productSchema = ProductSchema;