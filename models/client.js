const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const {productSchema} = require('./product')

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Field name is required.']
    },
    email: {
        type: String,
        unique: [true, 'Email already exists.']
    },
    favoriteProduct: {
        type: [productSchema]
    }
}, { collection: 'client' });

module.exports = mongoose.model('client', ClientSchema);