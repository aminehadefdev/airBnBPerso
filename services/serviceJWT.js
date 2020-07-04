const jwt = require('jsonwebtoken')
const env = require("dotenv").config().parsed;

const JWT_SIGN_SECRET = env.JWT_SIGN_SECRET
class serviceJWT {
    static generateTokenForUser(user) {
        return jwt.sign({
            email: user.email,
            role: user.role
        }, JWT_SIGN_SECRET, {
            expiresIn: "24h"
        })
    }

    static UserIsAutorised(token) {
        try {
            return jwt.verify(token, JWT_SIGN_SECRET);
        } catch (error) {
            return false
        }
    }
}

module.exports = serviceJWT;