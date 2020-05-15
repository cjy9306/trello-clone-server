const router = require('express').Router()
const controller = require('../controllers/team.controller')
const authMiddleware = require('../../middlewares/auth')

router.use(authMiddleware);

router.post('/', controller.createTeam);
router.get('/:teamId', controller.getTeam);
router.put('/:teamId', controller.updateTeam);
router.delete('/:teamId', controller.deleteTeam);
router.post('/:teamId/member', controller.addTeamMember);
router.delete('/:teamId/member/:memberId', controller.deleteTeamMember);

module.exports = router;
