const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    // read the token from header or url 
    const token = req.headers['accesstoken'] || req.query.token;
    // console.log('authmiddleware ; ' + token)
    
    if (!token) {
        return res.status(403).json({
            success: false,
            data: 'not logged in'
        })
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    const respond = (decoded) => {
        req.decoded = decoded
        next()
    }

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    // process the promise
    p.then(respond)
    .catch(onError)
}

module.exports = authMiddleware