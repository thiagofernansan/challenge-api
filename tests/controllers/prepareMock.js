const mongoose = require('mongoose');
const { Mockgoose } = require('mock-mongoose');
const mockgoose = new Mockgoose(mongoose);


let prepare = () => {
    console.log('LSKDJFKJD')
    mockgoose.prepareStorage().then(() => {
        mongoose.connect('mongodb://example.com/TestingDB', err => {
            done(err);
        });
    });
    
}
module.exports.prepare = prepare;