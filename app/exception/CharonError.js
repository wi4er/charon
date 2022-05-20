module.exports = class CerberusError extends Error {
    static assert(value, message) {
        if (!value) {
            throw new this(message);
        }
    }
}
