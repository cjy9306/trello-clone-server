const router = require('express').Router();
const auth = require('./auth');
const member = require('./member');
const board = require('./board');
const team = require('./team');

router.use('/auth', auth);
router.use('/board', board);
router.use('/member', member);
router.use('/team', team);

module.exports = router;