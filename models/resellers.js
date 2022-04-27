const mongoose = require('mongoose');

const brandsSchema = mongoose.Schema({
    resellerId: { type: String, required: true},
    createdAt: { type: Date, required: true},
    points: { type: Number, required: true },
    tierId: { type: String, required: true},
    updatedAt: { type: Date, required: true }
});

module.exports = mongoose.model('resellers', brandsSchema);