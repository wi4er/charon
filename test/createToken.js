const env = require("../environment");
const jwt = require("jsonwebtoken");

function createToken(user) {
    return [
        "authorization",
        `Bearer ${jwt.sign(
            {id: user._id},
            env.SECRET,
            {algorithm: 'HS256'}
        )}`
    ]
}

module.exports = createToken;
