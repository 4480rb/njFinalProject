var OrderModel = require('../models/Orders1Model');
const { ObjectId } = require("mongodb");



exports.getAll = async function (req, res,next) {
    try {
        const AllOrders = await OrderModel.find().populate({path:'userId',select:'name'}).populate({path:'orderItems.productId'});      
        res.send(AllOrders);
    }

    catch (error) {
       next(error);
    }
};


exports.getOrderById = async function (req, res,next) {
    try{
        const order = await OrderModel.findOne((ObjectId(req.params.id))).populate({path:'userId' , select:'name'});
    res.send(order);
    }
    catch(error){
next(error);
    }
};

exports.addOrderToDb = async function (req, res,next) {
    try {
        let order = new OrderModel(req.body);
        const insert = await order.save();
        res.send(insert);
    }
    catch (error) {
        next(error);
    }

};


exports.deleteOrder = async function (req, res,next) {
    try{
         const id = req.params.id;
    const order = await OrderModel.deleteOne({ _id: (ObjectId(id)) });
    res.send("order" + order + " deleted🤔");
    }
   catch(error){
next(error);
   }
};

exports.updateOrder = async function (req, res,next) {
    if (req.body) {
        try {
            const id = ObjectId(req.params.id);
            const { orderItems } = req.body;
            const data = {
                orderItems: orderItems
            }
            const updateOrder = await model.findByIdAndUpdate(id, data, {
                new: true
            });
            res.send("order updates!!👌");
        }
        catch (error) {
           next(error);
        }
    }
};