var Products1Model = require('../models/Products1Model.js');
const { ObjectId } = require("mongodb");


exports.getAll = async function (req, res, next) {
    try {
        const Allproducts = await Products1Model.find().populate({path:'categorya_id',select:'c_name'})
        res.send(Allproducts);
    }
    catch (error) {
        next(error);
    }
};


exports.getProductByCategory = async function (req, res, next) {
    try {
        const id = req.params.id;
        const product = await Products1Model.find({categorya_id: ObjectId(id) });
        res.send(product);
    }
    catch (error) {
        next(error);
    }
};
exports.getAlldes = async function (req, res, next) {
    try {
        const dess=[]
        const Allproducts = await Products1Model.find().populate({path:'categorya_id'})
        Allproducts.forEach(data => {
            var p=[];
            p=data.des.split(" ");
            if(p.length>5)
              des.push(data);
        });
        res.send(dess);
    }
    catch (error) {
        next(error);
    }
};





exports.addProductToDb = async function (req, res,next) {
    try {
        let product = new Products1Model(req.body)
        await product.save();
        res.send("product added succsesfully ");
    }
    catch (error) {
        next(error);
    }
};


exports.deleteProduct = async function (req, res,next) {
    try{
    const id = req.params.id;
    const product = await Products1Model.deleteOne({ _id: (ObjectId(id)) });
    res.send(`product deleted🤔`);
}catch(error){
    next(error)
}
};

exports.updateProduct = async function (req, res) {
    if (req.body) {
        try {
            const id = ObjectId(req.params.id);
            const { p_name, price, categorya_id } = req.body;
            const data = {
                p_name: p_name,
                price: price,
                categorya_id: categorya_id
            }
            const updateProduct = await Products1Model.findByIdAndUpdate(id, data, {
                new: true
            });
            res.send("product updates!!👌");
        }
        catch (error) {
            next(error)
            // console.log(`error accured😢 the error is: ${error}`);
        }
    }
};