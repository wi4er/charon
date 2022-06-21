const {Router} = require("express");
const router = Router();
const Hash = require("../model/Hash");
const {HASH} = require("../permission/entity");
const {GET, POST, PUT, DELETE} = require("../permission/method");
const permissionCheck = require("../permission/check");
const {createGet, createGetById, createPost, createPut, createDelete} = require("./factory/routeFactory");

const flagQuery =  {
    parseFilter: require("./filter")({
        "field": {
            ...require("./filter/fieldFilter"),
        },
    }),
    parseSort: require("./sort")({

    }),
};

router.get(
    "/",
    permissionCheck([HASH], GET),
    createGet(Hash, flagQuery),
);

router.get(
    "/:id/",
    permissionCheck([HASH], GET),
    createGetById(Hash),
);

router.post(
    "/",
    permissionCheck([HASH], POST),
    createPost(Hash),
);

router.put(
    "/:id/",
    permissionCheck([HASH], PUT),
    createPut(Hash),
);

router.delete(
    "/:id/",
    permissionCheck([HASH], DELETE),
    createDelete(Hash),
);

module.exports = router;
