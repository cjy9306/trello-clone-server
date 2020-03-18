const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
	// read the token from header or url
	const token = req.headers['accesstoken'] || req.query.token;
	// console.log('url ;  ' + req.url + ' token ; ' + token);

	if (!token) {
		return res.status(403).json({
			success: false,
			data: 'invalid access'
		});
	}

	try {
		const decoded = await jwt.verify(token, process.env.JWT_KEY);
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
