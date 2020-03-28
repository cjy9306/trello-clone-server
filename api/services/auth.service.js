const models = require('../../models/models');
const jwt = require('jsonwebtoken');
const generateCode = require('../../utils/utils').generateCode;

class AuthService {
	register = async memberDTO => {
		const verify_code = generateCode(6); // for email confirm

		try {
			const check = await models.Members.findOne({
				where: {
					username: memberDTO.username
				}
			});

			if (check) throw new Error('The username already exists');

			const member = await models.Members.create({
				id: 0,
				username: memberDTO.username,
				password: memberDTO.password,
				name: memberDTO.name,
				birth_day: memberDTO.birth_day,
				gender: memberDTO.gender,
				email: memberDTO.email,
				phone: memberDTO.phone,
				email_verification: true,
				verify_code: verify_code,
				social_login_provider: memberDTO.social_login_provider
			});

			return { member };
		} catch (e) {
			throw e;
		}
	};

	login = async (memberDTO, secret_key) => {
		try {
			const member = await models.Members.findOne({
				where: {
					username: memberDTO.username,
					password: memberDTO.password
				}
			});
			if (!member) throw new Error('Username or password is invalid.');
			const token = await jwt.sign(
				{
					id: member.member_id,
					username: member.username
				},
				secret_key,
				{
					expiresIn: '1d'
				}
			);
			return { token, member_id: member.member_id, username: member.username };
		} catch (e) {
			throw e;
		}
	};

	checkUser = async memberDTO => {
		try {
			const member = await models.Members.findOne({
				where: {
					username: memberDTO.username,
					password: memberDTO.password
				}
			});

			if (!member) return false;
			else return true;
		} catch (e) {
			throw e;
		}
	};
}

module.exports = new AuthService();
