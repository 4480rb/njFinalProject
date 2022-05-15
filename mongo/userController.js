const{ObjectId}=require("mongodb");
const db=require('../DB/mongoDb');



exports.getAllUsers = async function (req, res) {  
    const allUsers=await db.getDB().collection('users').find().toArray();
    res.send(allUsers);
};

exports.getUserById = async function (req, res) {
    const user=await db.getDB().collection('users').findOne((ObjectId(req.params.id)));
    res.send(user)   
};

exports.addUserToDb = async function (req, res){
    if(req.body){
    const user=req.body;
    const {name,password,email}=user;
    const doc={name:name,password:password,email:email};
       const insert= await db.getDB().collection('users').insertOne(doc);
 res.send("hello "+name+"! we are happy to see you!");
    }
};

exports.deleteUser = async function (req, res) {
    const id=req.params.id;
    const user=await db.getDB().collection('users').deleteOne({_id:(ObjectId(id))});
    res.send("user deleted🤔");
};

exports.updateUser = async function (req, res) {
    if(req.body){
const id=req.params.id;
const user=req.body;
const {name,password,email}=user;
const doc={name:name,password:password,email:email};
await db.getDB().collection('users').updateOne({_id :(ObjectId(id))}
,{
    $set:{
        name:user.name,
        password:user.password,
        email:user.email
    }
})
    res.send("user updates!!👌");
}
};


