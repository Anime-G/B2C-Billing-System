const express = require("express");
const router = express.Router();

const { Bills, BillItems, Forms, Clients,Users, Goods } = require("../models");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
router.get("/:FormId", async (req, res) => {
  const { FormId } = req.params;
  const data = await Bills.findAll({
    where: { FormId },
    order:[['Date','DESC'],['InvoiceNo','DESC']],
    include: [{ model: Forms },{ model: Clients }],
  });
  res.json(data);
});
router.get("/count/:FormId", async (req, res) => {
  const { FormId } = req.params;
  const data = await Bills.count({
    where: { FormId },
  });
  res.json(data);
});
router.get("/countbyuser/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Forms.findAll({
    where:{UserId:id},
    include:[{model:Bills,attributes: [],duplicating: false}]
    ,attributes:['id',[Sequelize.fn('COUNT', Sequelize.col('Bills.id')), 'NoOfBills']]
    ,group: ['id']
  });
  res.json(data);
});
router.get("/ShowBill/:BillId", async (req, res) => {
  const { BillId } = req.params;
  const data = await Bills.findAll({
    where: { id: BillId },
    attributes:{exclude:['id','createdAt','updatedAt','UserId','FormId']},
    include: [
      { model: Forms ,attributes:{exclude:['id','createdAt','updatedAt','UserId']}},
      { model: Clients ,attributes:['name','phno']},
      { model: BillItems ,attributes:['Qty','rate'], include: [{ model: Goods, attributes:{exclude:['id','createdAt','updatedAt','FormId']}}] },
    ],
  });
  res.json(data);
});
router.post("/add", async (req, res) => {
  const { items, FormId, Date, name, phno, InvoiceNo } = req.body;
  console.log({ items, FormId, Date, name, phno, InvoiceNo });
  let data = await Clients.findOrCreate({
    where: { phno, FormId },
    defaults: { name, phno, FormId },
  });
  // console.log("client",data[0].id);

  data = Bills.create({ InvoiceNo, Date, FormId, ClientId: data[0].id }).then(
    async (Billresult) => {
      console.log(BillItems);
      for (let i = 0; i < items.length; i++) {
        const { qty, rate, GoodsId } = items[i];
        console.log(rate);
        await BillItems.create({
          Qty: qty,
          rate: rate,
          GoodId: GoodsId,
          BillId: Billresult.id,
        });
      }
      return Billresult;
    }
  );

  if (data) {
    res.json({ msg: "Bill Generated SuccessFully!" });
  } else {
    res.json({ msg: "Bill Failed Generate!" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  
  let data = await Bills.destroy({
    where: { id },
  });
  
  if (data) {
    res.json({ msg: "Bill Deleted SuccessFully!" });
  } else {
    res.json({ err: "Bill Failed to delete!" });
  }
});
router.get("/Invoiceno/:FormId", async (req, res) => {
  const { FormId } = req.params;
  const data = await Bills.findOne({
    where: { FormId },
    order: ["id", "DESC"],
  });
  let InvoiceNo = 1;
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  if (data) {
  }

  res.json(InvoiceNo);
});
module.exports = router;
