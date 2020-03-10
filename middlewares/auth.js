const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
	// read the token from header or url
	const token = req.headers['accesstoken'] || req.query.token;
	// console.log('authmiddleware ; ' + token)

	if (!token) {
		return res.status(403).json({
			success: false,
			data: 'invalid access'
		});
	}

	try {
		const decoded = await jwt.verify(token, req.app.get('jwt-secret'));
		req.decoded = decoded;
		next();
	} catch (e) {
		res.status(403).json({
			success: false,
			message: e.message
		});
	}
};

module.exports = authMiddleware;
