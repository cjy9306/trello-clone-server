const router = require('express').Router()
const controller = require('../controllers/member.controller')
// const authMiddleware = require('../../middlewares/auth')

router.get('/:member_id/boards', authMiddleware)
router.get('/:member_id/boards', controller.getAllBoards);

router.get('/:member_id/teams', authMiddleware);
router.get('/:member_id/teams', controller.getTeams);

module.exports = router;
