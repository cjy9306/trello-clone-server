/*
 *  controller의 error를 handling하는 미들웨어
 *
 */
const errorHandler = (errorMsg, req, res, next) => {
    // Error에 대한 로깅 필요

    return res.status(400).json({ success: false, data: errorMsg });
};

module.exports = errorHandler;