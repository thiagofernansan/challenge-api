const Client = require('../models/client')

module.exports.list = async (req, res, next) => {
    res.json({ action: 'list' })
}
module.exports.get = async (req, res, next) => {
    let client = await Client.findById(req.params.id, 'name email')
    res.json(client)
}
module.exports.create = async (req, res, next) => {
    let client = new Client(req.body)
    let cl = await client.save().catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
            return res.status(422).json({code: 422, msg: 'E-mail already registered'})
        }
        return res.status(422).send(err)
    })
    return res.status(201).json(cl);
}
module.exports.update = async (req, res, next) => {
    res.json({ action: `update` })
}
module.exports.del = async (req, res, next) => {
    res.json({ action: `delete` })
}