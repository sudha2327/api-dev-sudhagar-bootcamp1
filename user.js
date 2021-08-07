const mangoose=require("mongoose")

const userSchema=new mangoose.Schema({
    name: String,
    email:String,
    phone: Number,
    userType: String,
});

const userModel=mangoose.model("User",userSchema)

module.exports=userModel
