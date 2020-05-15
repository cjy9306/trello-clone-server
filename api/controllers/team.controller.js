const TeamService = require('../services/team.service');

exports.createTeam = async (req, res, next) => {
	let teamDTO = req.body;
	try {
		const team = await TeamService.createTeam(teamDTO);

		res.status(200).json({ success: true, data: team });
	} catch (e) {
		return next(e.message);
	}
};

exports.getTeam = async (req, res, next) => {
	const { teamId } = req.params;
	try {
		const data = await TeamService.getTeam(teamId);

		res.status(200).json({ success: true, data });
	} catch (e) {
		return next(e.message);
	}
};

exports.updateTeam = async (req, res, next) => {
	const { teamId } = req.params;
	let teamDTO = req.body;
	teamDTO['teamId'] = teamId;
	try {
		const message = await TeamService.updateTeam(teamDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.deleteTeam = async (req, res, next) => {
	const { teamId } = req.params;
	try {
		const message = await TeamService.deleteTeam(teamId);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.addTeamMember = async (req, res, next) => {
	const { teamId } = req.params;
	let memberDTO = req.body;
	memberDTO['teamId'] = teamId;
	try {
		const message = await TeamService.addTeamMember(memberDTO);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};

exports.deleteTeamMember = async (req, res, next) => {
	const { teamId, memberId } = req.params;
	try {
		const message = await TeamService.deleteTeamMember(teamId, memberId);

		res.status(200).json({ success: true, data: message });
	} catch (e) {
		return next(e.message);
	}
};
