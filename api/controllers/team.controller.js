const TeamService = require('../services/team.service');

exports.getTeam = async (req, res) => {
    const { teamId } = req.params;
    try {
        const data = await TeamService.getTeam(teamId);

        res.status(200).json({success: true, data});
    } catch(e) {
        res.status(400).json({success: false, data: e})
    }
};

exports.addTeamMember = async (req, res) => {
    const { teamId } = req.params;
    let memberDTO = req.body;
    memberDTO['team_id'] = teamId;
    try {
        const message = await TeamService.addTeamMember(memberDTO);

        res.status(200).json({success: true, data: message});
    } catch(e) {
        res.status(400).json({success: false, data: e})
    }
};

exports.deleteTeamMember = async (req, res) => {
    const { teamId, memberId } = req.params;
    try {
        const message = await TeamService.deleteTeamMember(teamId, memberId);

        res.status(200).json({success: true, data: message});
    } catch(e) {
        res.status(400).json({success: false, data: e})
    }
};