const mongoose = require("mongoose");

module.exports = async function clearDatabase() {
    const coll = Object.values(mongoose.connection.collections);

    for (const item of coll) {
        await item.deleteMany({});
    }
}
