const env = require("../../../environment");

module.exports = function getConnectionUrl() {
    if (env.DB_URL) {
        return env.DB_URL;
    }

    return [
        "mongodb://",
        env.DB_USER,
        ":",
        env.DB_PASSWORD,
        "@",
        env.DB_HOST,
        ":",
        env.DB_PORT,
        "/",
        env.DB_NAME,
    ].join("");
}
