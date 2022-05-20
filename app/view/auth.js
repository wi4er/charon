const {Router} = require("express");
const router = Router();
const Auth = require("../model/Auth");
const WrongIdError = require("../exception/WrongIdError");
const {AUTH} = require("../permission/entity");
const {GET, POST, PUT, DELETE} = require("../permission/method");
const permissionCheck = require("../permission/check");

router.get(
    "/",
    permissionCheck(AUTH, GET),
    (req, res, next) => {
        Auth.find(
            require("../query/authFilter").parseFilter(req.query.filter)
        )
            .then(result => res.send(result))
            .catch(next);
    }
);

router.get(
    "/:id/",
    permissionCheck(AUTH, GET),
    (req, res, next) => {
        const {params: {id}} = req;

        Auth.findById(id)
            .then(result => {
                WrongIdError.assert(result, `Cant find auth with id ${id}!`);

                res.send(result);
            })
            .catch(next);
    }
);

router.post(
    "/",
    permissionCheck(AUTH, POST),
    (req, res, next) => {
        new Auth(req.body).save()
            .then(result => {
                res.status(201);
                res.send(result);
            })
            .catch(next);
    }
);

router.put(
    "/:id/",
    permissionCheck(AUTH, PUT),
    (req, res, next) => {
        const {params: {id}} = req;

        WrongIdError.assert(id === req.body._id, "Wrong id in body request");

        Auth.findById(id)
            .then(result => {
                WrongIdError.assert(result, `Cant update auth with id ${id}!`);

                return Object.assign(result, req.body).save();
            })
            .then(saved => res.send(saved))
            .catch(next);
    }
);

router.delete(
    "/:id/",
    permissionCheck(AUTH, DELETE),
    (req, res, next) => {
        const {params: {id}} = req;

        Auth.findById(id)
            .then(result => {
                WrongIdError.assert(result, `Cant delete auth with id ${id}!`);

                return result.delete();
            })
            .then(() => res.send(true))
            .catch(next);
    }
);

module.exports = router;
