const request = require('supertest');
const app = require('../../app')

const mongoose = require('mongoose');
const { Mockgoose } = require('mock-mongoose');
const mockgoose = new Mockgoose(mongoose);

before(() => {
    mockgoose.prepareStorage().then(() => {
        mongoose.connect('mongodb://example.com/TestingDB', err => {
            done(err);
        });
    })

});
describe('Client Controller', () => {
    it('When create a client, should return status 201', async done => {
        const res = await request(app)
            .post('/api/client')
            .send({
                email: 'test@test2.com.br',
                name: 'Test'
            })
        expect(res.status).toBe(201);
        done();
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