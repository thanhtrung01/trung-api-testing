const router = require('express').Router();

const authCTRL = require('../controllers/auth.controller');

const { isAuth } = require('../middlewares/authentication');

router.post('/login', authCTRL.login);
router.post('/register', authCTRL.register);
module.exports = router;