const router = require('express').Router();
// const auth = require('./auth/auth');
const member = require('./member');
// const board = require('./board/board');

// router.use('/auth', auth);
// router.use('/board', board);
router.use('/member', member);

module.exports = router;