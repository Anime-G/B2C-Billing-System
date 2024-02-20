const express = require("express");
const router = express.Router();

const { Bills, BillItems, Forms, Clients, Goods } = require("../models");
const { Op } = require("sequelize");

router.get("/:FormId", async (req, res) => {
  const { FormId } = req.params;
  const data = await Bills.findAll({
    where: { FormId },
    includes: [{ modal: Forms }],
    includes: [{ modal: Clients }],
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
