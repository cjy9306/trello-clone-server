const AuthService = require('../services/auth.service');

exports.login = async (req, res) => {
    const userDTO = req.body;
    console.log('userDTO : ' + JSON.stringify(userDTO))
    try {
        const secret_key = req.app.get('jwt-secret');
        const data = await AuthService.login(userDTO, secret_key);

        res.status(200).json({success: true, data});
    } catch(e) {
        res.status(400).json({success: false, data: e})
    }
};