const mongoose = require("mongoose");
const getConnectionUrl = require("./connection/getConnectionUrl");
const getConnectionOptions = require("./connection/getConnectionOptions");

let connection = null;

function connect() {
    if (!connection) {
        return mongoose.connect(getConnectionUrl(), getConnectionOptions())
            .then(conn => connection = conn);
    } else {
        return Promise.resolve(connection);
    }
}

function disconnect() {
    return this.connection?.close?.();
}

function createConnection(req, res, next) {
    connect()
        .then(() => next())
        .catch(err => next(err));
}

async function clearDatabase() {
    const coll = Object.values(mongoose.connection.collections);

    for (const item of coll) {
        await item.deleteMany({});
    }
}

module.exports = {
    connect,
    disconnect,
    clearDatabase,
    createConnection,
};
