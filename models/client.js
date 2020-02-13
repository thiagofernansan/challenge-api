const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    email: {
        type: String,
        unique: true,
    },
    favoriteProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }]
}, { collection: 'client' });

module.exports = mongoose.model('client', ClientSchema);