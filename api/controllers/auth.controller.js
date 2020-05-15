const AuthService = require('../services/auth.service');

exports.register = async (req, res, next) => {
	const memberDTO = req.body;
	try {
		const member = await AuthService.register(memberDTO);

		res.status(200).json({ success: true, data: member });
	} catch (e) {
		return next(e.message);
	}
};

exports.socialLogin = async (req, res, next) => {
	const memberDTO = req.body;
	try {
		const userExist = await AuthService.checkUser(memberDTO);
		if (!userExist) {
			await AuthService.register(memberDTO);
		}
		const secret_key = process.env.JWT_KEY;
		const data = await AuthService.login(memberDTO, secret_key);
		res.status(200).json({ success: true, data });
	} catch (e) {
		return next(e.message);
	}
};

exports.login = async (req, res, next) => {
	const memberDTO = req.body;
	try {
		const secret_key = process.env.JWT_KEY;
		const data = await AuthService.login(memberDTO, secret_key);

		res.status(200).json({ success: true, data });
	} catch (e) {
		return next(e.message);
	}
};

exports.refreshToken = async (req, res, next) => {
	const token = req.headers['accesstoken'] || req.query.token;
	try {
		const secret_key = process.env.JWT_KEY;
		const data = await AuthService.refreshToken(token, secret_key);

		res.status(200).json({ success: true, data });
	} catch (e) {
		return next(e.message);
	}
};
