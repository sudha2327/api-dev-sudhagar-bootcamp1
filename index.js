require("dotenv").config();
const express =require("express");
const connectodb = require("./connect");
const { update } = require("./user");
//const connectDB=require("./connect")

const userModel=require("./user")

const app=express(); //build our api

app.use(express.json());


app.get("/",async(req,res)=>{
   // return res.json({message:'succes'});
   try{
    const user =await userModel.find();
    return res.json({ user });

   }catch(error){
       return res.status(500).json({ error: error.message});

   }
   

})

//add a data



/*app.post('/user',(req,res)=>{
    return res.json(req.params);
})*/

/*app.post('/user/:id',(req,res)=>{
    return res.json(req.params);
}) */

app.post("/user/new",async(req,res)=>{
   // console
   try{

    const { newUser } =req.body;
    await userModel.create(newUser);

    return res.json({message:"user created"});
   }catch(error){
       return res.status(500).json({error:error.message})
   }
   
});

//route:/user/update/:_id

app.put("/user/update/:_id",async(req,res)=>{
    
     const { _id }=req.params;
     const{ userData }=req.body;

     const updateUser=await userModel.findByIdAndUpdate(_id,{ $set:userData },
        { new:true }
        );//$set means setting the data

        return res.json({user:updateUser})
});



//route:/user/delete/:_id


app.delete("/user/delete/:_id",async(req,res)=>{

    const { _id }=req.params;
    await userModel.findByIdAndDelete(_id);
    return res.json({message:"user deleted!.."})



})

//route:/user/delete/:userType

app.usedelete("/user/delete/type/:userType", async(req,res) => {
    const { userType }=req.params;

    const alluser =await userModel.find()
    await userModel.findOneAndDelete({ userType })

    return res.json({message: "user deleted !"})
})







app.listen(
    process.env.PORT,()=>connectodb()
.then(()=>console.log("server is running "))
.catch((error)=>console.log(error))
);








