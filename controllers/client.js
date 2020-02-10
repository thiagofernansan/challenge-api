const Client = require('../models/client')

module.exports.list = async (req, res) => {
    res.json({ action: 'list' })
}
module.exports.get = async (req, res) => {
    try {
        let client = await Client.findById(req.params.id)
        if (client == null) return res.status(404).json({ message: 'Client not Found.' })
        return res.json({name: client.name, email: client.email})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: error.message })
    }
}
module.exports.create = async (req, res) => {
    try {
        await validatedByEmail(req)
        let client = new Client({
            name: req.body.name,
            email: req.body.email
        })

        let savedClient = await client.save()
        return res.status(201).json(savedClient);

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
        await validatedByEmail(req);
        
        let client = await Client.findByIdAndUpdate(req.params.id, {
            ...(name && req.body.name),
            ...(email && req.body.email)
        })
        return res.json(client)
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
        await Client.findByIdAndDelete(req.params.id)
        return res.json({ msg: 'Client deleted.' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: error.message })
    }
}
async function validatedByEmail(req) {
    let clientFound = await Client.findOne({ email: req.body.email });
    if (clientFound !== null) throw {name: 'MongoError', code: 11000}
}

