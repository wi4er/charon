const filterList = {
    "field_id": (result, list) => {
        result["_id"] = list;
    },
}

const sortList = {

};

module.exports = {
    parseFilter: require("./filterParser")(filterList),
    parseSort: require("./sortParser")(sortList),
};
