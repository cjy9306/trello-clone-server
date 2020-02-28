const models = require('../../models/models');

class TeamService {
    getTeam = async (teamId) => {
        try {
            const team = await models.Team.findOne({
                where: {
                    team_id: teamId,
                }
            });

            const teamMembers = await models.Members.findAll({
                include: [
                    {
                        model: models.Team,
                        through: { attributes: []},
                        where: { team_id: teamId },
                    }
                ]
            });

            return { team, teamMembers };
        } catch(e) {
            throw e;
        }
    };

    addTeamMember = async (memberDTO) => {
        try {
            const member = await models.Members.findOne({
                where: {
                    email: memberDTO.email,
                }
            });

            if (!member) throw new Error('can not find the member');

            await models.TeamMember.create({
                team_id: memberDTO.team_id,
                member_id: member.member_id,
            });

            return 'member add success';
        } catch(e) {
            throw e;
        }
    };

    deleteTeamMember = async (teamId, memberId) => {
        try {
            await models.TeamMember.destroy({
                where: {
                    team_id: teamId,
                    member_id: memberId,
                }
            });

            return 'member delete success';
        } catch(e) {
            throw e;
        }
    };
};

module.exports = new TeamService();