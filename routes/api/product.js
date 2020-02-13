const {Router} = require('express');
const {list, get} = require('../../controllers/product')

const router = Router();
router.get('/', list);
router.get('/:id', get);

module.exports = router;
