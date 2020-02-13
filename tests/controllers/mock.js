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
let singleProduct = new Product({
    price: 999.99,
    image: 'http://challenge-api.test.com/images/4',
    brand: 'Consul',
    title: 'Fogao 4 bocas',
    reviewScore: 4.3
})
before(async () => {
    await init('models');
    await mongoose.connection.db.dropDatabase();
    productTest = await Product.insertMany(productList);
    let x = productTest.map(p => {
        return { id: p._id }
    })
    clientTest.favoriteProducts = productTest;
    clientTest = await clientTest.save()
    singleProduct = await singleProduct.save();
});

exports.clientTest = clientTest;
exports.singleProduct = singleProduct;
