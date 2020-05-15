const router = require('express').Router();
const auth = require('./auth');
const member = require('./member');
const board = require('./board');
const team = require('./team');

const errorHandler = require('../../middlewares/errorHandler');

router.use('/auth', auth);
router.use('/board', board);
router.use('/member', member);
router.use('/team', team);

// error handler
router.use(errorHandler);

module.exports = router;