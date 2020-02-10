'use strict';

const Client = require('../models/client')

module.exports.list = async (req, res, next) => {
    res.json({action: 'list'})
}
module.exports.get = async (req, res, next) => {
    let client = await Client.findById(req.params.id, 'name email')
    res.json(client)
}
module.exports.create = async (req, res, next) => {
    let client = new Client(req.body)
    client.save((err,client) => {
        console.error(err)
        console.log(client)
    })
    res.status(201).json(client)
}
module.exports.update = async (req, res, next) => {
    res.json({action: `update`})
}
module.exports.del = async (req, res, next) => {
    res.json({action: `delete`})
}