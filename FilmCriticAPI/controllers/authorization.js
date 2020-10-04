const redis = require('./signIn');
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization) {
        return res.status(400).json('Unauthorized')
    }
    const tokenID = authorization.split(" ")[1]
    redis.redisClient.get(tokenID, (err, userID) => {
        if(err || !userID) {
            return res.status(400).json('Unauthorized')
        }
        // Verify token has not expired
        jwt.verify(tokenID, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) {
                redis.redisClient.del(tokenID)
                return res.status(401).json('Expired Token')
            }
            // req.user = {id: user.id, email: user.email}
            next()
        })
    })
}

module.exports = {
    requireAuth: requireAuth
}