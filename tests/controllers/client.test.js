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
    describe('When create a client', () => {
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
        it('Returns status 422 with E-mail already registered', done => {
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
    it('Get exist client', done => {
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
})