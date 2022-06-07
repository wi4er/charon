const {Error: {ValidationError}, Error} = require("mongoose");
const {MongoServerError} = require("mongodb");
const PermissionError = require("./PermissionError");
const {UnauthorizedError} = require("express-jwt");

function formatError(err) {
    return {
        message: err.message
    };
}

module.exports = (err, req, res, next) => {
    console.log(err);

    switch (err.constructor) {
        case ValidationError: {
            res.status(400);

            break;
        }

        case Error: {
            res.status(400);

            break;
        }

        case PermissionError: {
            res.status(403);

            break;
        }

        case MongoServerError: {
            res.status(400);

            break;
        }

        default: {
            res.status(500);
        }
    }

    res.json(formatError(err));
}
