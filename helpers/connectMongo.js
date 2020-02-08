
// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
    //     const collection = client.db("test").collection("devices");
    //     // perform actions on the collection object
    //     client.close();
    // });
    
const uri = "mongodb+srv://dbuser:ffD6Yopf5xVP2qZv@challenge-api-o4yie.gcp.mongodb.net/test?retryWrites=true&w=majority";
const mongoose = require('mongoose');
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