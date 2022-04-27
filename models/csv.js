const mongoose = require('mongoose');

const brandsSchema = mongoose.Schema({
    brandId: { type: String, required: true},
    multiplier: { type: Number, required: true},
    tierId: { type: String, required: true }
});

module.exports = mongoose.model('look_up_points', brandsSchema);