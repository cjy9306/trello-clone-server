const models = require('../../models/models');

class TeamService {
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
            const exist = await models.Team.findOne({
                where: {
                    team_name: teamDTO.teamName
                }
            });

            if (exist) throw new Error('This team name already exists');

            const team = await models.Team.create({
                team_id: 0,
                team_name: teamDTO.teamName,
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

    getTeam = async (teamId) => {
        try {
            const team = await models.Team.findOne({
                where: {
                    team_id: teamId,
                }
            });

            if (!team) throw new Error('can not find the team');

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

    updateTeam = async (teamDTO) => {
        try {
            await models.Team.update({
                    team_name: teamDTO.teamName,
                    description: teamDTO.description,
                }, {
                    where: {
                        team_id: teamDTO.teamId,
                    }
                }
            )

            return 'update team success';
        } catch(e) {
            throw e;
        }
    };

    deleteTeam = async (teamId) => {
        try {
            await models.Team.destroy({
                where: {
                    team_id: teamId,
                }
            })

            return 'delete team success';
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
                team_id: memberDTO.teamId,
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