const express = require("express");
const router = express.Router();
const {Goods}=require('../models');
router.post("/add",async(req,res)=>{
    const { form, name, HsnCode, GstRate }=req.body;
    
})
module.exports=router