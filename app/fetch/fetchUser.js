const fetch = require("./index");

const filterConfig = {
    uniq: value => {
        return `filter[uniq][EMAIL][in]=${value}`
    },
    id: value => {
        return `filter[field][id][in]=${value}`
    }
}

function formatFilter(filter) {
    const res = [];

    if (Array.isArray(filter)) {
        filter = [filter];
    }

    for (const item in filter) {
        res.push(filterConfig[item](filter[item]));
    }

    return res.join("&")
}

function fetchUser(filter) {
    return fetch.get(
        `/content/?${formatFilter(filter)}`,
    ).then(resp => resp.data);
}

module.exports = fetchUser;
