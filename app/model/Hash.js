const mongoose = require("mongoose");

const HashSchema = new mongoose.Schema({
    timestamp: Date,
    user: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
    algorithm: String,
});

HashSchema.pre("save", next => {
    this.timestamp = new Date();

    next();
});

module.exports = mongoose.model("hash", HashSchema);
