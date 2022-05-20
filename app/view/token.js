const {Router} = require("express");
const router = Router();
const Auth = require("../model/Auth");
const User = require("../model/User");
const PermissionError = require("../exception/PermissionError");
const md5 = require("md5");
const createToken = require("../permission/createToken");
const WrongRefError = require("../exception/WrongRefError");
const userCheck = require("../permission/user");
const env = require("../../environment");

router.get(
    "/public/",
    (req, res, next) => {
        const user = new User({});

        if (env.DEFAULT_PUBLIC_GROUP) {
            user.group = env.DEFAULT_PUBLIC_GROUP;
        }

        user.save()
            .then(inst => res.send(createToken(inst)))
            .catch(next);
    }
);

router.get(
    "/password/",
    (req, res, next) => {
        const {headers: {contact, password}} = req;

        User.findOne({"contact.value": contact})
            .then(user => {
                PermissionError.assert(user, "Wrong user data!");

                return Auth.findOne({"user": user._id})
                    .then(auth => {
                        PermissionError.assert(auth, "Password required!");
                        PermissionError.assert(md5(password) === auth.hash, "Wrong permission data!");

                        res.send(createToken(user));
                    });
            })
            .catch(next);
    }
);

router.get(
    "/password/:userID/",
    (req, res, next) => {
        const {
            headers: {password},
            params: {userID},
        } = req;

        User.findById(userID)
            .then(user => {
                PermissionError.assert(user, "Wrong user data!");

                return Auth.findOne({"auth.user": userID})
                    .then(auth => {
                        PermissionError.assert(auth, "User password required!");
                        PermissionError.assert(md5(password) === auth.hash, "Wrong permission data!");
                        res.send(createToken(user));
                    });
            })
            .catch(next);
    }
);

router.post(
    "/password/",
    userCheck,
    (req, res, next) => {
        Auth.findOne({
            "user": req.user.id,
        })
            .then(item => {
                WrongRefError.assert(!item, "Password already exists");

                return new Auth({
                    user: req.user.id,
                    hash: md5(req.headers.password),
                }).save();
            })
            .then(item => User.findById(item.user))
            .then(user => {
                res.status(201);
                res.send(createToken(user));
            })
            .catch(next);
    }
);

router.put(
    "/password/",
    userCheck,
    (req, res, next) => {
        Auth.findOne({
            "user": req.user.id,
        })
            .then(item => {
                WrongRefError.assert(item, "Password don't exists");
                item.password = md5(req.headers.password);
                return item.save();
            })
            .then(item => User.findById(item.user))
            .then(user => {
                res.status(201);
                res.send(createToken(user));
            })
            .catch(next);
    }
);

router.delete(
    "/password/",
    userCheck,
    (req, res, next) => {
        Auth.findOne({
            "user": req.user.id,
        })
            .then(item => {
                WrongRefError.assert(item, "Password don't exists");
                return item.delete();
            })
            .then(item => User.findById(item.user))
            .then(user => res.send(createToken(user)))
            .catch(next);
    }
);

module.exports = router;
