const request = require('supertest');
const app = require('../../app')
const expect = require('chai').expect;

const mongoose = require('mongoose');

// before(async () => {
//     await mockgoose.prepareStorage().then(() => mongoose.connect('mongodb://example.com/TestingDB'));
// });

before(() => {
    mongoose.connection.db.dropDatabase()
})
describe('Client Controller Test', () => {
    describe('When create a client', () => {
        it('Returns status 201', done => {
            request(app)
                .post('/api/client')
                .send({
                    email: 'test@test2.com.br',
                    name: 'Test'
                })
                .expect(201)
                .then(() => done())
                .catch(done)
        })
        it('Returns status 422 with E-mail already registered', done => {
            request(app)
                .post('/api/client')
                .send({
                    email: 'test@test2.com.br',
                    name: 'Test'
                })
                .expect(422)
                .then(() => done())
                .catch(done)
        })
    })
    it('When get a exist client, should return status 200', done => {
        request(app)
            .get('/api/client/5e408bf30c703781d04e0883')
            .expect(200)
            .then(response => {
                expect(response.body).contain.property('email')
            })
            .then(() => done())
            .catch(done)
    })
})