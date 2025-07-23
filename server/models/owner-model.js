const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    products: {
        type: Array,
        default: [],
    },
    picture: {
        type: String,
        default: "/images/default-avatar.png",  // Set default image path
    },
    gstin: String,
});

module.exports = mongoose.model("Owner", ownerSchema);
