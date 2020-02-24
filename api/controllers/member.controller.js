const BoardService = require('../services/board.service');
const MemberSerivce = require('../services/member.service');

exports.getAllBoards = async (req, res) => {
    const { memberId } = req.params;
    try {
        const result = await BoardService.getAllBoards(memberId);

        res.status(200).json({success: true, data: result});
    } catch(e) {
        res.status(400).json({success: false, data: e})
    }
};

exports.getTeams = async (req, res) => {
    const { memberId } = req.params;
    try {
        const teams = await MemberSerivce.getTeams(memberId);

        res.status(200).json({success: true, data: teams});
    } catch(e) {
        res.status(400).json({success: false, data: e})
    }
};