const mongoose=require('mongoose');
const { connection_string } = require('../config');


class mongooseDb{

constructor(){}

async connect(){
    const url=connection_string
    await mongoose.connect(url);
    console.log("mongoose Connected!")
};

}

module.exports=new mongooseDb();