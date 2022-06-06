const connect = require("./connection/connect");

module.exports = function createConnection(req, res, next) {
    connect()
        .then(() => next())
        .catch(err => next(err));
}
