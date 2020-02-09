
const mongoose = require('mongoose');
const {readRecursiveDirectory} = require('./utils')

const uri = "mongodb+srv://dbuser:ffD6Yopf5xVP2qZv@challenge-api-o4yie.gcp.mongodb.net/test?retryWrites=true&w=majority";

let connect = async () => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


    // When successfully connected
    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open');
    });

    // If the connection throws an error
    mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

}

module.exports.init = async modelFolder => {
    try {
        await connect();

        let fileModels = readRecursiveDirectory(modelFolder)
            .filter(item => {
                return item !== '';
            });
        fileModels.forEach(file => {
            let m = file.replace('.js', '');
            require('../' + m);
            console.log('Model ' + m + ' --> ok!');
        });
    } catch (err) {
        console.log(`Error: ${err}`);
    }
};