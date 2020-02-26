const router = require('express').Router()
const controller = require('../controllers/member.controller')
const authMiddleware = require('../../middlewares/auth')

router.get('/:memberId/boards', authMiddleware)
router.get('/:memberId/boards', controller.getAllBoards);

router.get('/:memberId/teams', authMiddleware);
router.get('/:memberId/teams', controller.getTeams);

router.post('/:memberId/teams', authMiddleware);
router.post('/:memberId/teams', controller.createTeam);

module.exports = router;
