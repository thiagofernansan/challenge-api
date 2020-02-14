const { Router } = require('express');
const jwt = require('jsonwebtoken');

const router = Router();
router.post('/', (req, res) => {
    try {
        if (req.headers.token === process.env.AUTHKEY) {
            return res.json({ token: jwt.sign({ role: 'admin' }, process.env.AUTHSECRET) })
        }
        return res.status(401).send()

    } catch (error) {
        console.error(error)
        res.status(500)
    }
});

module.exports = router;
