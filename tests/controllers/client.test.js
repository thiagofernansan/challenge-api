const request = require('supertest');
const app = require('../../app')
const expect = require('chai').expect;
const mongoose = require('mongoose');

const { clientTest, singleProduct } = require("./mock");

let tokenAuth;
before(async () => {
    let r = await request(app)
        .post('/auth')
        .set('token', process.env.AUTHKEY)

    tokenAuth = r.body.token
})

describe('Client Controller Test', () => {

    describe('Create a client', () => {
        it('Returns status 201', done => {
            request(app)
                .post('/api/client')
                .set('Authorization', `Bearer ${tokenAuth}`)
                .send({
                    email: 'test@test3.com',
                    name: 'Test'
                })
                .expect(201)
                .then(() => done())
                .catch(done)
        })
        it('Returns 422 with E-mail already registered', done => {
            request(app)
                .post('/api/client')
                .set('Authorization', `Bearer ${tokenAuth}`)
                .send({
                    email: 'test@test3.com',
                    name: 'Test2'
                })
                .expect(422)
                .then(() => done())
                .catch(done)
        })
    })
    describe('Get client', () => {
        it('Return 200 and the client obj', done => {
            request(app)
                .get(`/api/client/${clientTest._id}`)
                .set('Authorization', `Bearer ${tokenAuth}`)
                .expect(200)
                .then(response => {
                    expect(response.body).to.deep.eq({ name: clientTest.name, email: clientTest.email });
                    expect(response.body).to.not.contain.property('_id');

                })
                .then(() => done())
                .catch(done)
        })
        it('Return status 404 when client does not exist', done => {
            request(app)
                .get(`/api/client/43alfkjaksdfsd`)
                .set('Authorization', `Bearer ${tokenAuth}`)
                .expect(404)
                .then(() => done())
                .catch(done)
        })
    })
    describe('Update client', () => {
        it('Return 204 and the client obj', done => {
            request(app)
                .put(`/api/client/${clientTest._id}`)
                .set('Authorization', `Bearer ${tokenAuth}`)
                .send({
                    name: 'Name Updated',
                })
                .expect(204)
                .then(() => done())
                .catch(done)
        })
        it('Return 400 if id is invalid', done => {
            request(app)
                .put(`/api/client/asldkjflksadj`)
                .set('Authorization', `Bearer ${tokenAuth}`)
                .send({
                    name: 'Name Updated2',
                    email: 'newClient@email.com'
                })
                .expect(400)
                .then(() => done())
                .catch(done)
        })
        it('Return 422 with emails already registered', done => {
            request(app)
                .put(`/api/client/${clientTest._id}`)
                .set('Authorization', `Bearer ${tokenAuth}`)
                .send({
                    name: 'Name Updated2',
                    email: 'test@test3.com'
                })
                .expect(422)
                .then(() => done())
                .catch(done)
        })
    })
    describe('Get favorite products', () => {
        it('Return 200', done => {
            request(app)
                .get(`/api/client/${clientTest._id}/favorite-products`)
                .set('Authorization', `Bearer ${tokenAuth}`)
                .expect(200)
                .then(() => done())
                .catch(done)
        })
        it('Return favorite products list', done => {
            request(app)
                .get(`/api/client/${clientTest._id}/favorite-products`)
                .set('Authorization', `Bearer ${tokenAuth}`)
                .expect(200)
                .then(response => {
                    expect(response.body.length).to.eq(clientTest.favoriteProducts.length);
                })
                .then(() => done())
                .catch(done)
        })
    })
    describe('Save favorite product', () => {
        it('Return 400 if product exists into list', done => {
            request(app)
                .post(`/api/client/${clientTest._id}/favorite-products`)
                .set('Authorization', `Bearer ${tokenAuth}`)
                .send({ productId: clientTest.favoriteProducts[0]._id })
                .expect(400)
                .then(() => done())
                .catch(done)
        })
        it('Return 400 if product is not exist', done => {
            request(app)
                .post(`/api/client/${clientTest._id}/favorite-products`)
                .set('Authorization', `Bearer ${tokenAuth}`)
                .send({ productId: mongoose.Types.ObjectId() })
                .expect(400)
                .then(() => done())
                .catch(done)
        })
        it('Return favorite products list', done => {
            request(app)
                .get(`/api/client/${clientTest._id}/favorite-products`)
                .set('Authorization', `Bearer ${tokenAuth}`)
                .expect(200)
                .then(response => {
                    expect(response.body.length).to.eq(clientTest.favoriteProducts.length);
                })
                .then(() => done())
                .catch(done)
        })
        it('Return 201 when product is added into the list', done => {
            request(app)
                .post(`/api/client/${clientTest._id}/favorite-products`)
                .set('Authorization', `Bearer ${tokenAuth}`)
                .send({ productId: singleProduct._id })
                .expect(201)
                .then(response => { console.log(response.body) })
                .then(() => done())
                .catch(done)
        })
    })
    describe('Delete Client', () => {
        it('Return 200 when delete client', done => {
            request(app)
                .delete(`/api/client/${clientTest._id}`)
                .set('Authorization', `Bearer ${tokenAuth}`)
                .expect(200)
                .then(() => done())
                .catch(done)
        })
        it('Return 404 when get a deleted client', done => {
            request(app)
                .get(`/api/client/${clientTest._id}`)
                .set('Authorization', `Bearer ${tokenAuth}`)
                .expect(404)
                .then(() => done())
                .catch(done)
        })
        it('Return 404 when delete a deleted client', done => {
            request(app)
                .delete(`/api/client/${clientTest._id}`)
                .set('Authorization', `Bearer ${tokenAuth}`)
                .expect(404)
                .then(() => done())
                .catch(done)
        })
    })
})