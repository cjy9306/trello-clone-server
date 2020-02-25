const router = require('express').Router()
const controller = require('../controllers/auth.controller')
const authMiddleware = require('../../middlewares/auth')

router.post('/register', controller.register);
router.post('/socialLogin', controller.socialLogin);
router.post('/login', controller.login)


module.exports = router;
