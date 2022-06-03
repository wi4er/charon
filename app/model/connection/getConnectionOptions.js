const env = require("../../../environment");

module.exports = function getConnectionOptions() {
    const options = {};

    if (env.USE_SSL) {
        options.ssl = true;
        options.sslCA = env.USE_SSL;
    }

    return options;
}
