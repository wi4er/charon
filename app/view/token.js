const {Router} = require("express");
const router = Router();
const Hash = require("../model/Hash");
const PermissionError = require("../exception/PermissionError");
const createToken = require("../permission/createToken");
const WrongRefError = require("../exception/WrongRefError");
const env = require("../../environment");
const {postUser, fetchUser} = require("../fetch/fetchUser");

router.get(
    "/public/",
    (req, res, next) => {
        PermissionError.assert(env.ENABLE_PUBLIC_USER, "Public user not enable");
        const user = {};

        if (env.DEFAULT_PUBLIC_GROUP) {
            user.section = env.DEFAULT_PUBLIC_GROUP;
        }

        postUser(user)
            .then(inst => res.json({authorization: createToken(inst)}))
            .catch(next);
    }
);

router.get(
    "/password/",
    (req, res, next) => {
        const {headers: {contact, password}} = req;

        Hash.findOne({})

        fetchUser()
            .then()
        // User.findOne({"contact.value": contact})
        //     .then(user => {
        //         PermissionError.assert(user, "Wrong user data!");
        //
        //         return Hash.findOne({"user": user._id})
        //             .then(auth => {
        //                 PermissionError.assert(auth, "Password required!");
        //                 PermissionError.assert(md5(password) === auth.hash, "Wrong permission data!");
        //
        //                 res.send(createToken(user));
        //             });
        //     })
        //     .catch(next);
    }
);

router.get(
    "/password/:userID/",
    (req, res, next) => {
        // const {
        //     headers: {password},
        //     params: {userID},
        // } = req;
        //
        // User.findById(userID)
        //     .then(user => {
        //         PermissionError.assert(user, "Wrong user data!");
        //
        //         return Hash.findOne({"auth.user": userID})
        //             .then(auth => {
        //                 PermissionError.assert(auth, "User password required!");
        //                 PermissionError.assert(md5(password) === auth.hash, "Wrong permission data!");
        //                 res.send(createToken(user));
        //             });
        //     })
        //     .catch(next);
    }
);

router.post(
    "/password/",
    // userCheck,
    (req, res, next) => {
        // Auth.findOne({
        //     "user": req.user.id,
        // })
        //     .then(item => {
        //         WrongRefError.assert(!item, "Password already exists");
        //
        //         return new Hash({
        //             user: req.user.id,
        //             hash: md5(req.headers.password),
        //         }).save();
        //     })
        //     .then(item => User.findById(item.user))
        //     .then(user => {
        //         res.status(201);
        //         res.send(createToken(user));
        //     })
        //     .catch(next);
    }
);

router.put(
    "/password/",
    // userCheck,
    (req, res, next) => {
        // Hash.findOne({
        //     "user": req.user.id,
        // })
        //     .then(item => {
        //         WrongRefError.assert(item, "Password don't exists");
        //         item.password = md5(req.headers.password);
        //         return item.save();
        //     })
        //     .then(item => User.findById(item.user))
        //     .then(user => {
        //         res.status(201);
        //         res.send(createToken(user));
        //     })
        //     .catch(next);
    }
);

router.delete(
    "/password/",
    // userCheck,
    (req, res, next) => {
        // Hash.findOne({
        //     "user": req.user.id,
        // })
        //     .then(item => {
        //         WrongRefError.assert(item, "Password don't exists");
        //         return item.delete();
        //     })
        //     .then(item => User.findById(item.user))
        //     .then(user => res.send(createToken(user)))
        //     .catch(next);
    }
);

module.exports = router;
