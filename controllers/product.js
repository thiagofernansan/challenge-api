const Product = require('../models/product')
const { parseProduct } = require('../helpers/utils')

module.exports.list = async (req, res) => {
    try {
        let products = await Product.find();

        let retProducts = products.map(p => parseProduct(p))
        return res.json(retProducts)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: error.message })
    }
}

module.exports.get = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)
        if (product == null) return res.status(404).json({ message: 'product not Found.' })
        return res.json(parseProduct(product))
    } catch (error) {
        if (error.name === 'CastError') return res.status(404).json({ message: 'product not Found.' })
        console.error(error);
        return res.status(500).json({ msg: error.message })
    }
}