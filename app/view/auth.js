const {Router} = require("express");
const router = Router();
const Hash = require("../model/Hash");
const WrongIdError = require("../exception/WrongIdError");
const {AUTH} = require("../permission/entity");
const {GET, POST, PUT, DELETE} = require("../permission/method");
const permissionCheck = require("../permission/check");
const authQuery = require("../query/authQuery");

router.get(
    "/",
    permissionCheck(AUTH, GET),
    (req, res, next) => {
        const {query: {filter, sort, limit, offset}} = req;
        const parsedFilter = authQuery.parseFilter(filter);
        const parsedSort = authQuery.parseSort(sort);

        Promise.all([
            Hash.count(parsedFilter),
            Hash.find(parsedFilter)
                .sort(parsedSort)
                .limit(+limit)
                .skip(+offset)
        ])
            .then(([count, list]) => {
                res.header("total-row-count", count);
                res.header("Access-Control-Expose-Headers", "total-row-count");

                res.json(list);
            })
            .catch(next);
    }
);

router.get(
    "/:id/",
    permissionCheck(AUTH, GET),
    (req, res, next) => {
        const {params: {id}} = req;

        Hash.findById(id)
            .then(result => {
                WrongIdError.assert(result, `Cant find auth with id ${id}!`);

                res.json(result);
            })
            .catch(next);
    }
);

router.post(
    "/",
    permissionCheck(AUTH, POST),
    (req, res, next) => {
        new Hash(req.body).save()
            .then(result => {
                res.status(201);
                res.json(result);
            })
            .catch(next);
    }
);

router.put(
    "/:id/",
    permissionCheck(AUTH, PUT),
    (req, res, next) => {
        const {params: {id}} = req;

        WrongIdError.assert(id === req.body._id, "Wrong id in request body");

        Hash.findById(id)
            .then(result => {
                WrongIdError.assert(result, `Cant update auth with id ${id}!`);

                return Object.assign(result, req.body).save();
            })
            .then(saved => res.json(saved))
            .catch(next);
    }
);

router.delete(
    "/:id/",
    permissionCheck(AUTH, DELETE),
    (req, res, next) => {
        const {params: {id}} = req;

        Hash.findById(id)
            .then(result => {
                WrongIdError.assert(result, `Cant delete auth with id ${id}!`);

                return result.delete()
                    .then(status => {
                        WrongIdError.assert(status, `Cant delete auth with id ${id}!`);
                        res.json(result);
                    });
            })
            .catch(next);
    }
);

module.exports = router;
