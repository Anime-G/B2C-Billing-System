
const express = require("express");
const router = express.Router();

const { Forms,Clients } = require("../models");
const { Op } = require("sequelize");

router.get("/:UserId",async(req,res)=>{
    const data=await Forms.findAll({where:{UserId:req.params.UserId}})
    res.json(data);
})
router.get("/find/:id",async(req,res)=>{
    const data=await Forms.findOne({where:{id:req.params.id}})
    res.json(data);
})
router.get("/Client/:id",async(req,res)=>{
    const data=await Clients.count({where:{FormId:req.params.id},duplicating: false})
    res.json(data);
})
router.post("/add",async(req,res)=>{
    const {UserId,address,formGst,logo,name,phno,shortName}=req.body
   
    const gstcount=await Forms.count({where:{formGst}})
    const formname=await Forms.count({where:{name}})
    if(gstcount>0)
    {
        res.json({err:"Gst no is Already Registered!"})
    }
    else if(formname>0)
    {
        res.json({err:"From name is Already Registered!"})
    }
    else{
    const data=await Forms.create({UserId,address,formGst,logo,name,phno,shortName});
    if(data)
    {
        res.json({msg:"Form Created!"})
    }
    else
    {
        res.json({msg:"Form not Created!"})

    }
}})
router.patch("/update",async(req,res)=>{
    const {UserId,id,address,formGst,logo,name,phno,shortName}=req.body
    const gstcount=await Forms.count({where:{formGst,id:{[Op.not]:id}}})
    const formname=await Forms.count({where:{name,id:{[Op.not]:id}}})
    if(gstcount>0)
    {
        res.json({err:"Gst no is Already Registered!"})
    }
    else if(formname>0)
    {
        res.json({err:"From name is Already Registered!"})
    }
    else{
    const data=await Forms.update({UserId,address,formGst,logo,name,phno,shortName},{where:{id}});
    if(data)
    {
        res.json({msg:"Form Updated!"})
    }
    else
    {
        res.json({msg:"Form not Updated!"})

    }
        }

})

module.exports=router;