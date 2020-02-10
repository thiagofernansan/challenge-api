const request = require('supertest');
const app = require('../app')

// const mongoose = require('mongoose');

// const { Mockgoose } = require('mock-mongoose')
// const mockgoose = new Mockgoose(mongoose);

const Client = require('../models/client')

// mockgoose.prepareStorage().then(() => {
//     mongoose.connect('mongodb://example.com/TestingDB', err => {
//         done(err)
//     })
//     mongoose.connection.on('connected', () => {
//         console.log('db connection is open')
//     })
//     mongoose.connection.on('error', () => {
//         console.log('db connection is ERROR')
//     })

//     mongoose.connection.once('open', () => {
//         console.log('we are connected!')
//     })
// })

describe('Sample Test', () => {
    xit('should test that true === true', async done => {

        let client = new Client({
            email: 'teste@teste.com',
            name: 'Teste'
        })

        console.log(client)
        client.save((err,client) => {
            console.error(err)
            console.log(client)
        })

        const res = await request(app)
            .get('/api/product')
        console.log(res.status, res.body)
        expect(true).toBe(true)

        done();
    })
})