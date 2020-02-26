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

    createTeam = async (teamDTO) => {
        const trans = await models.sequelize.transaction();
        try {
            const team = await models.Team.create({
                team_id: 0,
                team_name: teamDTO.team_name,
                description: teamDTO.description,
                create_time: Date.now(),
            }, { transaction: trans });

            const team_member = await models.TeamMember.create({
                team_id: team.team_id,
                member_id: teamDTO.memberId,
            }, { transaction: trans });

            trans.commit();
            return { team };
        } catch(e) {
            trans.rollback();
            throw e;
        }
    };
};

module.exports = new MemberService();