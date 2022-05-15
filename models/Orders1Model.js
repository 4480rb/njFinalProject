var mongoose = require('mongoose');


const orderItemSchema=new mongoose.Schema({
    'productId':{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    Quantity:Number
})
const orderSchema = new mongoose.Schema({
  
    orderDate: Date ,  
    'orderSum': {
        type: Number,
        required: true
    },
    'userId': {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    'orderItems':{
        type:[orderItemSchema],
        required: true
}
},{timestamps:true})



module.exports = mongoose.model('Order', orderSchema)