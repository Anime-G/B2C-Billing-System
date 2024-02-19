
const express = require("express");
const router = express.Router();

const { Bills,Forms,Clients } = require("../models");
const { Op } = require("sequelize");

router.get('/:FormId',async (req,res)=>{
    const {FormId}=req.params;
    const data=await Bills.findAll({where :{FormId},includes:[{modal:Forms}],includes:[{modal:Clients}]});
    res.json(data);
})


module.exports=router;
