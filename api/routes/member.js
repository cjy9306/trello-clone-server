const router = require('express').Router()
const controller = require('../controllers/member.controller')
const authMiddleware = require('../../middlewares/auth')

router.use(authMiddleware);

router.get('/:memberId/boards', controller.getAllBoards);
router.get('/:memberId/teams', controller.getTeams);

module.exports = router;
