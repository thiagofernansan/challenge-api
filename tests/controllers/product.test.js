
const request = require('supertest');
const app = require('../../app')
const expect = require('chai').expect;

const Product = require('../../models/product')

let productTest = []
before(async () => {
    productTest = await Product.find();
})

describe('Product Controller Test', () => {
    describe('Get product', () => {
        it('Return 200 and the product obj', done => {
            request(app)
                .get(`/api/product/${productTest[0]._id}`)
                .expect(200)
                .then(response => {
                    expect(response.body).to.deep.eq({
                        price: parseFloat(productTest[0].price),
                        brand: productTest[0].brand,
                        title: productTest[0].title,
                        image: productTest[0].image,
                        _id: productTest[0]._id.toString()
                    });
                })
                .then(() => done())
                .catch(done)
        })
        it('Return status 404 when product does not exist', done => {
            request(app)
                .get(`/api/product/43alfkjaksdfsd`)
                .expect(404)
                .then(() => done())
                .catch(done)
        })
    })
    describe('List products', () => {
        it('Return 200 and the list of product', done => {
            request(app)
                .get(`/api/product`)
                .expect(200)
                .then(response => {
                    // expect(response.body).to.deep.eq(productTest);
                })
                .then(() => done())
                .catch(done)
        })
    })
})