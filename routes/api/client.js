const {Router} = require('express');
const {list, get, create, update, del} = require('../../controllers/client')

const router = Router();
router.get('/', list);
router.get('/:id', get);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', del);

module.exports = router;
