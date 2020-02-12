const Client = require('../models/client')
const mongoose = require('mongoose');

module.exports.get = async (req, res) => {
    try {
        let client = await Client.findById(req.params.id)
        if (client == null) return res.status(404).json({ message: 'Client not Found.' })
        return res.json({ name: client.name, email: client.email })
    } catch (error) {
        if (error.name === 'CastError') return res.status(404).json({ message: 'Client not Found.' })
        console.error(error);
        return res.status(500).json({ msg: error.message })
    }
}

module.exports.create = async (req, res) => {
    try {
        return await createClient(req, res);
    } catch (error) {
        console.error(error)
        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(422).json({ code: 422, msg: 'E-mail already registered' });
        }
        return res.status(500).send(error);
    };
}

module.exports.update = async (req, res) => {
    try {
        if(!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({err: 'id is not valid or null.'});
        }
        await validateUpdateByEmail(req);
        let client = await Client.findByIdAndUpdate(req.params.id, {
            ...(req.body.name && { name: req.body.name }),
            ...(req.body.email && { email: req.body.email })
        }, {omitUndefined: true})
        console.log(client)
        return res.status(204).send()
    } catch (error) {
        console.error(error)
        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(422).json({ code: 422, msg: 'E-mail already registered' });
        }
        return res.status(500).send(error);
    }
}

module.exports.del = async (req, res) => {
    try {
        let client = await Client.findByIdAndDelete(req.params.id)
        if (client === null) return res.status(404).json({ message: 'Client not Found.' })
        return res.json({ msg: 'Client deleted.', client: client })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: error.message })
    }
}
async function createClient(req, res) {
    await validateByEmail(req);
    return await persistClientAndReturnStatus(req, res);
}

async function persistClientAndReturnStatus(req, res) {
    let client = new Client({
        name: req.body.name,
        email: req.body.email
    });
    let savedClient = await client.save();
    return res.status(201).json({ name: savedClient.name, email: savedClient.email });
}

async function validateByEmail(req) {
    let clientFound = await Client.findOne({ email: req.body.email });
    if (clientFound !== null) throw { name: 'MongoError', code: 11000 }
}
async function validateUpdateByEmail(req) {
    let clientFound = await Client.findOne({ email: req.body.email });
    if (clientFound !== null && clientFound.id === req.params.id) return;
    if (clientFound !== null) throw { name: 'MongoError', code: 11000 }
}
