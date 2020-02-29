const router = require('express').Router()
const controller = require('../controllers/team.controller')
const authMiddleware = require('../../middlewares/auth')


router.post('/', authMiddleware);
router.post('/', controller.createTeam);

router.get('/:teamId', authMiddleware)
router.get('/:teamId', controller.getTeam);

router.delete('/:teamId', authMiddleware);
router.delete('/:teamId', controller.deleteTeam);

router.post('/:teamId/member', authMiddleware);
router.post('/:teamId/member', controller.addTeamMember);

router.delete('/:teamId/member/:memberId', authMiddleware);
router.delete('/:teamId/member/:memberId', controller.deleteTeamMember);

module.exports = router;
