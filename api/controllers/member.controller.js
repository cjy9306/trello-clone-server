const BoardService = require('../services/board.service');
const TeamService = require('../services/team.service');

exports.getAllBoards = async (req, res, next) => {
	const { memberId } = req.params;
	try {
		const result = await BoardService.getAllBoards(memberId);

		res.status(200).json({ success: true, data: result });
	} catch (e) {
		return next(e.message);
	}
};

exports.getTeams = async (req, res, next) => {
	const { memberId } = req.params;
	try {
		const teams = await TeamService.getTeams(memberId);

		res.status(200).json({ success: true, data: teams });
	} catch (e) {
		return next(e.message)
	}
};
