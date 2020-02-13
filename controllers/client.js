const Client = require('../models/client')
const Product = require('../models/product')
const mongoose = require('mongoose');
const { parseProduct } = require('../helpers/utils')
const {createClient, validateUpdateByEmail} = require('../helpers/validator')

module.exports.get = async (req, res) => {
    try {
        if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: 'Client not Found.' });
        }
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
        if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ err: 'id is not valid.' });
        }
        await validateUpdateByEmail(req);
        await Client.findByIdAndUpdate(req.params.id, {
            ...(req.body.name && { name: req.body.name }),
            ...(req.body.email && { email: req.body.email })
        })
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
module.exports.favoriteProducts = async (req, res) => {
    try {
        let client = await Client.findById(req.params.id).populate({ path: 'favoriteProducts', select: '_id brand price title image reviewScore' })
        if (client === null) return res.status(404).json({ message: 'Client not Found.' })
        let retProducts = client.favoriteProducts.map(p => parseProduct(p))
        return res.json(retProducts)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: error.message })
    }
}
module.exports.addFavoriteProduct = async (req, res) => {
    try {
        if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: 'Client not Found.' });
        }
        let client = await Client.findById(req.params.id).populate('favoriteProducts');
        if (client === null) return res.status(404).json({ message: 'Client not Found.' })
        const favoriteListIndex = client.favoriteProducts.findIndex(f => f._id == req.body.productId);
        if (favoriteListIndex == 0) return res.status(400).json({ message: 'Product is already registered in your favorite list.' })
        let product = await Product.findById(req.body.productId);
        if (product == null) return res.status(400).json({ message: 'Product is not exist.' })
        client.favoriteProducts.push(product)
        await client.save()
        return res.status(201).json(parseProduct(product))
    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: error.message })
    }
}
