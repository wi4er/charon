const Permission = require("../model/Permission");
const PermissionError = require("../exception/PermissionError");
const {PUBLIC} = require("./entity");
const environment = require("../../environment");


module.exports = (entity, method) => (req, res, next) => {
    if (req.user?.admin) {
        return next();
    }

    PermissionError.assert(req.user?.group, "Permission denied!");

    Permission.findOne({
        entity: {$in: entity},
        method,
        group: {$in: req.user?.group},
    })
        .then(row => {
            PermissionError.assert(row, "Permission denied!");

            return next();
        })
        .catch(next);
}
