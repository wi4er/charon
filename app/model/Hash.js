const mongoose = require("mongoose");

const HashSchema = new mongoose.Schema({
    timestamp: Date,
    user: {
        type: String,
        required: true,
        unique: true,
    },
    hash: {
        type: String,
        required: true,
    },
    algorithm: {
        type: String,
        enum: Object.keys(require("../encode")),
        required: true,
    },
});

HashSchema.pre("save", next => {
    this.timestamp = new Date();

    next();
});

module.exports = mongoose.model("hash", HashSchema);
