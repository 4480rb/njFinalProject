const model = require('../models/user')
const { ObjectId } = require("mongodb");
const logger = require('../log/logger');
const {error}=require ('../log/logger');

exports.getAllUsers = async function (req, res, next) {
    try {
        const allUsers = await model.find();
        res.send(u);     
    }
    catch (error) {
        next(error);
    }
}

exports.getUserByNameAndPassword = async function (req, res, next) {
try{
    
        const name = req.params.name;
        const password = req.params.password;
        const user = await model.findOne({ name, password });
        if(user==null){
            res.status(204);
        }
        res.send(user)
    }
      catch(error){
           next(error);

}
}

exports.getUserById = async function (req, res, next) {
    try {
       const id=req.params.id;
        const data = await model.findById({_id:ObjectId(id)}).populate({path:'orders',
        populate:{path:'orderItems.productId'} });
         res.send(data)      
    }
    catch (error) {
        next(error);
    }
}

exports.addUserToDb = async function (req, res, next) {
    try {
        let newUser = new model(req.body);
        const insert = await newUser.save();
        res.send(`user ${insert.name} added succsesfully `);
    }
    catch (error) {
        next(error);
    }
};

exports.deleteUser = async function (req, res, next) {
    try {
        const id = req.params.id;
        await model.deleteOne({ _id: (ObjectId(id)) });
        res.send("user deleted🤔");
    }
    catch (error) {
        next(error);
    }
};



exports.updateUser = async function (req, res, next) {
    if (req.body) {
        try {
            const id = ObjectId(req.params.id);
            const { name, password, email } = req.body;
            const data = {
                name: name,
                password: password,
                email: email
            }
            const updateUser = await model.findByIdAndUpdate({ id, data }, { new: true });
            res.send("user updates!!👌");
        }
        catch (error) {
            next(error);
        }
    }
}
