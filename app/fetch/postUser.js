const fetch = require(".");

function postUser(user) {
    return fetch.post(
        "/content/",
        {data: user}
    ).then(resp => resp.data);
}

module.exports = postUser;
