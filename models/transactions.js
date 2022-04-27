const mongoose = require('mongoose');

const brandsSchema = mongoose.Schema({
    data: { 
        id: { type: String, required: true},
        currency : { type: String, required: true },
        entityType : { type: String, required: true },
        items: [
            {
                brandId : { type: String, required: true },
				multiplier : { type: Number, required: true },
				productId : { type: String, required: true },
				retailPrice : { type: Number, required: true },
				quantity : { type: Number, required: true },
				sku : { type: String, required: true },
				brandName : { type: String, required: true },
				points : { type: Number, required: true },
				_id : { type: String, required: true }
            }
        ],
        totalAmount: { type: String, required: true }
     },
    resellerId: { type: String, required: true},
    createdAt: { type: Date, required: true},
    eventType : { type: String, required: true},
	points : { type: Number, required: true },
	resId : { type: String, required: true},
	status : { type: String, required: true},
    tierId: { type: String, required: true},
    updatedAt: { type: Date, required: true }
});

module.exports = mongoose.model('transactions', brandsSchema);