const Client = require('../models/client')

let createClient = async (req, res) => {
    await isEmailCreated(req);
    return await persistClientAndReturnStatus(req, res);
}

let persistClientAndReturnStatus = async (req, res) => {
    let client = new Client({
        name: req.body.name,
        email: req.body.email
    });
    let savedClient = await client.save();
    return res.status(201).json({ name: savedClient.name, email: savedClient.email });
}

let isEmailCreated = async req => {
    let clientFound = await Client.findOne({ email: req.body.email });
    if (clientFound !== null) throw { name: 'MongoError', code: 11000 }
}
let validateUpdateByEmail = async req => {
    let clientFound = await Client.findOne({ email: req.body.email });
    if (clientFound !== null && clientFound.id === req.params.id) return;
    if (clientFound !== null) throw { name: 'MongoError', code: 11000 }
}

module.exports.createClient = createClient;
module.exports.validateUpdateByEmail = validateUpdateByEmail;