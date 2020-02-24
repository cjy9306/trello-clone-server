const Sequelize = require('sequelize');
const models = require('../../models/models');
const MemberModel = models.Members;
const BoardModel = models.Board;
const TeamModel = models.Team;

class MemberService {
    getTeams = async (memberId) => {
        try {
            const teams = await models.Team.findAll({
                attributes: ['team_id', 'team_name'],
                include: [{
                    model: models.Members,
                    through: {
                        attributes: [],
                    },
                    where: {
                        member_id: memberId,
                    }
                }],
            });
            
            return { teams };
        } catch(e) {
            throw e;
        }
    }
};

module.exports = new MemberService();