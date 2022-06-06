const mongoose = require("mongoose");

module.exports = async function clearUserDatabase() {
    const conn2 = await mongoose.createConnection('mongodb://user:example@localhost:27017/user');
    conn2.model("content", new mongoose.Schema({}));

    for (const item of Object.values(conn2.collections)) {
        await item.deleteMany({});
    }
}
