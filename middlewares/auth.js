const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
	// read the token from header or url
	const token = req.headers['accesstoken'] || req.query.token;
	
	if (!token) {
		return res.status(403).json({
			success: false,
			data: 'Invalid access',
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.decoded = decoded;
		next();
	} catch (e) {
		res.status(403).json({
			success: false,
			message: e.message,
		});
	}
};

module.exports = authMiddleware;
