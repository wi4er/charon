const env = require("../../environment");
const jwt = require("jsonwebtoken");
const http = require('http');

function fetchUser(userId) {
    return new Promise(resolve => {
        const options = {
            hostname: env.USER_HOST,
            port: +env.USER_PORT,
            path: `/content/?filter=field-id-in-${userId}`,
            method: 'GET',
            headers: {
                'authorization': env.ACCESS_TOKEN,
            },
        };

        const req = http.request(options, res => {
            let data = "";

            res.on('data', d => data += d);
            res.on("end", () => resolve(data));
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
            },
        };

        const req = http.request(options, res => {
            let data = "";

            res.on('data', d => data += d);
            res.on("end", () => resolve(data));
        });

        req.write(JSON.stringify(user));

        req.on('error', error => {
            console.error(error);
        });

        req.end();
    });
}

module.exports = {fetchUser, postUser};
