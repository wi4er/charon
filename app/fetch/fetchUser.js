const env = require("../../environment");
const jwt = require("jsonwebtoken");
const http = require('http');


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
    return new Promise(resolve => {
        const options = {
            hostname: env.USER_HOST,
            port: +env.USER_PORT,
            path: `/content/?${formatFilter(filter)}`,
            method: 'GET',
            headers: {
                'authorization': env.ACCESS_TOKEN,
            },
        };

        const req = http.request(options, res => {
            let data = "";

            res.on('data', d => data += d);
            res.on("end", () => resolve(JSON.parse(data)));
        });

        req.on('error', error => {
            console.error(error);
        });

        req.end();
    });
}

function postUser(user) {
    return new Promise(resolve => {
        const options = {
            hostname: env.USER_HOST,
            port: +env.USER_PORT,
            path: `/content/`,
            method: 'POST',
            headers: {
                'authorization': env.ACCESS_TOKEN,
                'Content-Type': "Application/json",
            },
        };

        const req = http.request(options, res => {
            let data = "";

            res.on('data', d => data += d);
            res.on("end", () => resolve(JSON.parse(data)));
        });

        req.write(JSON.stringify(user));

        req.on('error', error => {
            console.error(error);
        });

        req.end();
    });
}

module.exports = {fetchUser, postUser};
