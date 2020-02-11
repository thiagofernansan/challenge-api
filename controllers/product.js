const Product = require('../models/product')

module.exports.list = async (req, res, next) => {
    res.json({ action: 'list' })
}

module.exports.get = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)
        if (product == null) return res.status(404).json({ message: 'product not Found.' })
        return res.json({
            price: parseFloat(product.price.toString()),
            brand: product.brand,
            title: product.title,
            image: product.image,
            // reviewScore: product.reviewScore.toString(),
            _id: product._id
        })
    } catch (error) {
        if (error.name === 'CastError') return res.status(404).json({ message: 'product not Found.' })
        console.error(error);
        return res.status(500).json({ msg: error.message })
    }
}