const Product = require('../models/product')

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

function parseProduct(p) {
    return {
        ...(p.price && { price: parseFloat(p.price.toString()) }),
        brand: p.brand,
        title: p.title,
        image: p.image,
        ...(p.reviewScore && { reviewScore: parseFloat(p.reviewScore.toString()) }),
        _id: p._id
    };
}
