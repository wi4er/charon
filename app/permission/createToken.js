const jwt = require("jsonwebtoken");
const env = require("../../environment");

module.exports = user => {
    return `Bearer ${jwt.sign(
        {
            id: user._id, 
            admin: user.admin ?? false,
            group: user.group,
        },
        env.SECRET,
        { algorithm: 'HS256'}
    )}`;
}
