var mongoose = require('mongoose');


const categorya1Schema = new mongoose.Schema({
	'c_name': {
		type: String,
		required: true
	}
},{timestamps:true});

module.exports = mongoose.model('Categorya', categorya1Schema);
