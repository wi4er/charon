const fetch = require("./index");

const filterConfig = {
    uniq: value => {
        return `filter=uniq-in-${value}`
    },
    id: value => {
        return `filter=field-id-in-${value}`
    }
}

function formatFilter(filter) {
    const res = [];

    console.log(filter);
    
    
    for (const item in filter) {
        res.push(filterConfig[item](filter[item]));
    }

    return res.join("&")
    // return filter.map(item => filterConfig[item]()).join("&");
}

function fetchUser(filter) {
    return fetch.post(
        `/content/?${formatFilter(filter)}`,
    ).then(resp => resp.data);
}

module.exports = fetchUser;
