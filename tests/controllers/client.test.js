const request = require('supertest');
const app = require('../../app')
const { init } = require('../../helpers/connectMongo');
const Client = require('../../models/client');
const expect = require('chai').expect;

const mongoose = require('mongoose');

let clientTest = new Client({ name: 'TestName', email: 'testname@testemail.com' })

before(async () => {
    await init('models')
    await mongoose.connection.db.dropDatabase();
    clientTest = await clientTest.save()
})
describe('Client Controller Test', () => {
    describe('Create a client', () => {
        it('Returns status 201', done => {
            request(app)
                .post('/api/client')
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
                .expect(404)
                .then(() => done())
                .catch(done)
        })
    })
    describe('Update client', () => {
        it('Return 200 and the client obj', done => {
            request(app)
                .put(`/api/client/${clientTest._id}`)
                .send({
                    name: 'Name Updated',
                })
                .expect(200)
                .then(response => {
                    expect(response.body).to.deep.eq({ name: 'Name Updated', email: clientTest.email });
                })
                .then(() => done())
                .catch(done)
        })
        it('Return 200 if its the same email', done => {
            request(app)
                .put(`/api/client/${clientTest._id}`)
                .send({
                    name: 'Name Updated2',
                    email: clientTest.email
                })
                .expect(200)
                .then(response => {
                    expect(response.body).to.deep.eq({ name: 'Name Updated2', email: clientTest.email });
                })
                .then(() => done())
                .catch(done)
        })
        it('Return 422 with emails already registered', done => {
            request(app)
                .put(`/api/client/${clientTest._id}`)
                .send({
                    name: 'Name Updated2',
                    email: 'test@test3.com'
                })
                .expect(422)
                .then(() => done())
                .catch(done)
        })
    })
    describe('Delete Client', () => {
        it('Return 200 when delete client', done => {
            request(app)
            .delete(`/api/client/${clientTest._id}`)
            .expect(200)
            .then(() => done())
            .catch(done)
        })
        it('Return 404 when get a deleted client', done => {
            request(app)
            .get(`/api/client/${clientTest._id}`)
            .expect(404)
            .then(() => done())
            .catch(done)
        })
        it('Return 404 when delete a deleted client', done => {
            request(app)
            .delete(`/api/client/${clientTest._id}`)
            .expect(404)
            .then(() => done())
            .catch(done)
        })
    })
})