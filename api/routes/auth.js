const router = require('express').Router();
const controller = require('../controllers/auth.controller');

router.post('/register', controller.register);
router.post('/socialLogin', controller.socialLogin);
router.post('/login', controller.login);

router.post('/refresh', controller.refreshToken);

module.exports = router;
