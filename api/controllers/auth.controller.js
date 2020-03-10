const AuthService = require('../services/auth.service');

exports.register = async (req, res) => {
	const memberDTO = req.body;
	try {
		const member = await AuthService.register(memberDTO);

		res.status(200).json({ success: true, data: member });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.socialLogin = async (req, res) => {
	const memberDTO = req.body;
	try {
		const userExist = await AuthService.checkUser(memberDTO);
		console.log('after checkuser ;' + JSON.stringify(memberDTO));
		if (!userExist) {
			await AuthService.register(memberDTO);
		}
		console.log('in socialLogin');
		const secret_key = process.env.JWT_KEY;
		const data = await AuthService.login(memberDTO, secret_key);
		res.status(200).json({ success: true, data });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};

exports.login = async (req, res) => {
	const memberDTO = req.body;
	try {
		const secret_key = process.env.JWT_KEY;
		const data = await AuthService.login(memberDTO, secret_key);

		res.status(200).json({ success: true, data });
	} catch (e) {
		res.status(400).json({ success: false, data: e.message });
	}
};
