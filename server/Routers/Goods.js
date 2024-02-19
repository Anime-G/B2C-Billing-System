const express = require("express");
const router = express.Router();
const { Goods, Forms } = require("../models");
const { Op } = require("sequelize");

router.post("/add", async (req, res) => {
  const { FormId, name, HsnCode, GstRate } = req.body;
  // console.log({ FormId, name, HsnCode, GstRate });
  const goodsRepeat = await Goods.count({ where: { FormId, name } });
  if (goodsRepeat === 0) {
    const data = await Goods.create({ FormId, name, HsnCode, GstRate });
    if (data) {
      res.json({ msg: "product Added Successfully!" });
    } else {
      res.json({ msg: "product Failed to Add!" });
    }
  } else {
    res.json({ err: "product is Already in List!" });
  }
});

router.get("/:UserId", async (req, res) => {
  const data = await Goods.findAll({
    include: [
      {
        model: Forms,
        where: { UserId: req.params.UserId }, 
        attributes:[]// Filter forms by UserId
      },
    ],
  });
  res.json(data);
});
router.get("/form/:FormId",async(req,res)=>{
    const data=await Goods.findAll({where:{FormId:req.params.FormId},order: ['name']});
    res.json(data);
})
router.get("/find/:id",async(req,res)=>{
    const data=await Goods.findOne({where:{id:req.params.id}});
    res.json(data);
})
router.patch("/update",async(req,res)=>{
    const {FormId, name,id, HsnCode, GstRate} =req.body;
    const goodsRepeat = await Goods.count({ where: { FormId, name,id:{[Op.not]:id} } });
    if(goodsRepeat==0)
    {
        const data=await Goods.update({FormId, name,HsnCode,GstRate},{where:{id}});
        if(data)
        {
            res.json({msg:"Goods Updated!"});

        }
        else{
            res.json({err:"Goods failed to update!"});
        }
    }
    else{
        res.json({err:"Goods is Repeated in the Selected Form!"});

    }

})
router.delete("/delete/:id",async(req,res)=>{
    const data=await Goods.destroy({where:{id:req.params.id}});
    if(data)
        {
            res.json({msg:"Goods Deleted!"});

        }
        else{
            res.json({err:"Goods failed to Delete!"});
        }
})
module.exports = router;
