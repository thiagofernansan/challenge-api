
const mongoose = require('mongoose');
const { readRecursiveDirectory } = require('./utils')

const uri = "mongodb+srv://dbuser:ffD6Yopf5xVP2qZv@challenge-api-o4yie.gcp.mongodb.net/test?retryWrites=true&w=majority";

let connect = async () => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection
        .once('open', () => console.log('Mongoose connected! '))
        .on('error', (error) => console.warn('Error mongoose connection: ', error))
}

module.exports.init = async modelFolder => {
    try {
        await connect();
        let fileModels = readRecursiveDirectory(modelFolder)
            .filter(item => {
                return item !== '';
            });
        fileModels.map(file => {
            let m = file.replace('.js', '');
            require('../' + m);
            console.log('Model ' + m + ' --> ok!');
        });
    } catch (err) {
        console.error(`Error: ${err}`);
        throw err;
    }
};