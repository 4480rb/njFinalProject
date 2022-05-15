const { json } = require("express/lib/response");
const mongoose=require("mongoose");
const {isEmail}=require('validator');



const addressScheme=new mongoose.Schema({  
    street:String,
    city:String,
    state:String,
    country:String    
})


const groupSchema=new mongoose.Schema({
    'description':{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('Groups',groupSchema)

const nDate = new Date().toLocaleString('en-IL', {
    timeZone: 'Israel'
  });                       

const userScheme=new mongoose.Schema({
name:{
    type:String,
    minlength:2,  
    required:true 
},
password:{
type:Number,
min:4,
required:true 
},
email:{
    type:String,
    minlength:3,
    maxlength:20,
    required:true,
    unique:true,
    validate:[isEmail,'this email is not valid']
},
groupId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Groups"
},
last_visit:{
    type:Date,
    default:new Date(nDate)
},
address:[addressScheme],
},
{timestamps:true,'toJSON':{virtuals:true}});

userScheme.virtual('orders',{
    ref:'Order',
    localField:'_id',
    foreignField:'userId'
});

module.exports=mongoose.model('User',userScheme);