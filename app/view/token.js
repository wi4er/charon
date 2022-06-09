const {Router} = require("express");
const router = Router();
const Hash = require("../model/Hash");
const PermissionError = require("../exception/PermissionError");
const createToken = require("../permission/createToken");
const WrongRefError = require("../exception/WrongRefError");
const env = require("../../environment");
const {postUser, fetchUser} = require("../fetch/fetchUser");
const {md5} = require("../encode");

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

        PermissionError.assert(contact, "Contact required!");

        fetchUser({uniq: contact})
            .then(user => Hash.findOne({user: user[0]._id})
                .then(hash => {
                    PermissionError.assert(hash, "Password required!");

                    PermissionError.assert(md5(password, hash.hash.slice(0, 8)) === hash.hash, "Password required!");
                    res.send({authorization: createToken(user)});
                })
            )
            .catch(next);
    }
);

router.get(
    "/password/:userID/",
    (req, res, next) => {
        const {
            headers: {password},
            params: {userID}
        } = req;

        fetchUser({id: userID})
            .then(user => Hash.findOne({user: user[0]._id})
                .then(hash => {
                    PermissionError.assert(hash, "Password required!");

                    PermissionError.assert(md5(password, hash.hash.slice(0, 8)) === hash.hash, "Password required!");
                    res.send({authorization: createToken(user)});
                })
            )
            .catch(next);
    }
);

router.post(
    "/password/",
    // userCheck,
    (req, res, next) => {
        // const {
        //     user: {id},
        //     headers: {password}
        // } = req;
        //
        // Hash.findOne({user:id})
        //     .then(hash => {
        //         WrongRefError.assert(!hash, "Password already exists");
        //
        //         return new Hash({
        //             user: id,
        //             hash: md5(password),
        //         }).save();
        //     })
        //     .catch(next);


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
