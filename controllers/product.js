const Product = require('../models/product')

module.exports.list = async (req, res, next) => {
    res.json({action: 'list'})
}
module.exports.get = async (req, res, next) => {
    res.json({action: `get product id ${req.params.id}`})
}