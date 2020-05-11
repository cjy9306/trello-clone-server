const models = require('../../models/models');
const jwt = require('jsonwebtoken');
const generateCode = require('../../utils/utils').generateCode;
const crypto = require('crypto');

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
				password: crypto.createHash('sha256').update(memberDTO.password),
				name: memberDTO.name,
				birth_day: memberDTO.birthDay,
				gender: memberDTO.gender,
				email: memberDTO.email,
				phone: memberDTO.phone,
				email_verification: true,
				verify_code: verify_code,
				social_login_provider: memberDTO.socialLoginProvider
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
					password: memberDTO.password === null ? null : crypto.createHash('sha256').update(memberDTO.password).digest('base64')
				}
			});

			if (!member) throw 'Username or password is invalid.';

			const token = jwt.sign(
				{
					memberId: member.member_id,
					username: member.username
				},
				secret_key,
				{
					expiresIn: '3d'
				}
			);

			return { token };
		} catch (e) {
			if (typeof e === 'string') throw new Error(e);
			else throw e;
		}
	};

	refreshToken = async (token, secret_key) => {
		try {
			const decoded = jwt.decode(token);
			const member = await models.Members.findOne({
				where: {
					member_id: decoded.memberId,
					username: decoded.username
				}
			});

			// need to log can not refresh token
			// client error message doesn't need refresh message
			if (!member) throw new Error('Invalid access. Please re-login');

			const newToken = jwt.sign(
				{
					memberId: member.member_id,
					username: member.username
				},
				secret_key,
				{
					expiresIn: '3d'
				}
			);

			return { token: newToken };
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
