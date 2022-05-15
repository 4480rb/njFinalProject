const{ObjectId}=require("mongodb");
const db=require('../DB/mongoDb');


exports.getAll=async function(req,res){
const Allproducts= await db.getDB().collection('products').find().toArray();
res.send(Allproducts);
};

exports.getProductById=async function(req,res){
    const product= await db.getDB().collection('products').findOne((ObjectId(req.params.id)))
    res.send(product);
    };

    exports.addProductToDb=async function(req,res){ 
        if(req.body){  
        const product=req.body;
        const {name,category,price}=product;
        const doc={name:name,category:category,price:price};
        const insert= await db.getDB().collection('products').insertOne(doc);
        res.send("product added succsesfully ");
        }
} ;


exports.deleteProduct = async function (req, res) {
    const id=req.params.id;
    const propduct=await db.getDB().collection('products').deleteOne({_id:(ObjectId(id))});
    res.send("product"+propduct.name+" deleted🤔");
};

exports.updateProduct = async function (req, res) {
    if(req.body){
const id=req.params.id;
const product=req.body;
const {name,category,price}=product;
const doc={name:name,category:category,price:price};
await db.getDB().collection('products').updateOne({_id :(ObjectId(id))}
,{
    $set:{
        name:product.name,
        category:product.category,
        price:product.price

    }
})
    res.send("product updates!!👌");
}
};
