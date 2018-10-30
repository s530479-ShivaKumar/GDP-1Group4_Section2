var mongoose = require('mongoose');

var ShopSchema = mongoose.Schema({

	shopID: {
		type: String
	},
    
    size: {
		type: String
    },
    
    duedate: {
        type: Date
    }
	});

var shopOption = module.exports = mongoose.model('shopOption', ShopSchema);