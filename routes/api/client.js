const { Router } = require('express');
const { get, create, update, del } = require('../../controllers/client')

const router = Router();
router.get('/:id', get);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', del);

module.exports = router;
