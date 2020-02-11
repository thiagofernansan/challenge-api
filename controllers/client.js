const Client = require('../models/client')

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
        await validateByEmail(req)
        let client = new Client({
            name: req.body.name,
            email: req.body.email
        })

        let savedClient = await client.save()
        return res.status(201).json({ name: savedClient.name, email: savedClient.email });

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
        await validateUpdateByEmail(req);
        let client = await Client.findByIdAndUpdate(req.params.id, {
            ...(req.body.name && { name: req.body.name }),
            ...(req.body.email && { email: req.body.email })
        })
        let updatedClient = await Client.findById(client._id)
        return res.json({ name: updatedClient.name, email: updatedClient.email })
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
async function validateByEmail(req) {
    let clientFound = await Client.findOne({ email: req.body.email });
    if (clientFound !== null) throw { name: 'MongoError', code: 11000 }
}
async function validateUpdateByEmail(req) {
    let clientFound = await Client.findOne({ email: req.body.email });
    if (clientFound !== null && clientFound.id === req.params.id) return;
    if (clientFound !== null) throw { name: 'MongoError', code: 11000 }
}
