const mongoose = require("mongoose");

const HashSchema = new mongoose.Schema({
    timestamp: Date,
    created: {
        type: Date,
        immutable: true,
    },
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

HashSchema.pre("save", function(next) {
    this.timestamp = new Date();

    if (this.isNew) {
        this.created = new Date();
    }
    
    next();
});

module.exports = mongoose.model("hash", HashSchema);
