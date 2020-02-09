const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const ClientSchema = new mongoose.Schema({
    createdAt: {
        index: true,
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    }
}, { collection: 'client' });

module.exports.schema = ClientSchema;