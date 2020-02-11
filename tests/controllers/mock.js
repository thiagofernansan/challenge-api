const mongoose = require('mongoose');
const { init } = require('../../helpers/connectMongo');
const Product = require('../../models/product');
const Client = require('../../models/client');
let productList = [{
    price: 99,
    image: 'http://challenge-api.test.com/images/1',
    brand: 'Sony',
    title: 'Fone de Ouvido'
}, {
    price: 159,
    image: 'http://challenge-api.test.com/images/2',
    brand: 'Eletrolux',
    title: 'Ferro de passar',
    reviewScore: 4.7
},
{
    price: 1700,
    image: 'http://challenge-api.test.com/images/3',
    brand: 'Samsumg',
    title: 'Notebook Essentials E20 Intel Dual Core',
    reviewScore: 4.1
}];
let clientTest = new Client({ name: 'TestName', email: 'testname@testemail.com' })
before(async () => {
    await init('models');
    await mongoose.connection.db.dropDatabase();
    clientTest = await clientTest.save()
    productTest = await Product.insertMany(productList);
});

exports.clientTest = clientTest;
