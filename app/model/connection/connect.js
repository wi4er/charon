const mongoose = require("mongoose");
const getConnectionUrl = require("./getConnectionUrl");
const getConnectionOptions = require("./getConnectionOptions");

let connection = null;

function connect() {
    if (!connection) {
        return mongoose.connect(getConnectionUrl(), getConnectionOptions())
            .then(conn => connection = conn);
    } else {
        return Promise.resolve(connection);
    }
}

connect.disconnect = function() {
    return this.connection?.close?.();
}

module.exports = connect;
