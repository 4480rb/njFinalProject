const { ObjectId } = require("mongodb");
var Categorya1Model = require("../models/categorya1Model");



exports.getAll = async function (req, res,next) {
    try {
        const allCategories = await Categorya1Model.find()
        res.send(allCategories);
    }
    catch (error) {
        next(error);
    }
};

exports.getCategoryById = async function (req, res,next) {
    try{
    const category = await Categorya1Model.findOne((ObjectId(req.params.id)));
    res.send(category)
}catch(error){
    next(error);
}
};


exports.addCategory = async function (req, res) {
    try {
        let categorya1 = new Categorya1Model(req.body);
        const insert = await categorya1.save();
        res.send(`categorya ${insert.c_name} added succsesfully `);
    }
    catch (error) {
        next(error);
    }
};




exports.update = async function (req, res,next) {
    if (req.body) {
        try {
            const id = ObjectId(req.params.id);
            // const {c_name}=req.body;
            // const data = {
            //     c_name:c_name
            // }
            const updateCategory = await  Categorya1Model.findByIdAndUpdate(id, req.body, {
                new: true
            });
            res.send("category updates!!👌");
        }
        catch (error) {
            next(error);
        }
    }
};


exports.delete = async function (req, res,next) {
    try{
    const id = req.params.id;
    await Categorya1Model.deleteOne({ _id: (ObjectId(id)) });
    res.send("category deleted succesfully");
}
catch(error){
    next(error);
}
};
