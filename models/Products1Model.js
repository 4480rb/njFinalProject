var mongoose = require('mongoose');


var Products1Schema = new mongoose.Schema({
	p_name: {
		type: String,
		minlength: 2,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	categorya_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Categorya",
	},
	des: {
		type: String,
		required: true
	},
	img:{
	 type:String}
},{timestamps:true}
);

module.exports = mongoose.model('Product', Products1Schema);
