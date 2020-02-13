const { Router } = require('express');
const { get, create, update, del, favoriteProducts, addFavoriteProduct } = require('../../controllers/client')

const router = Router();
router.get('/:id/favorite-products', favoriteProducts);
router.post('/:id/favorite-products', addFavoriteProduct);
router.get('/:id', get);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', del);

module.exports = router;
