var mongoose = require('mongoose');
var express = require('express');
let router = express.Router();
let Purchase = require('../models/purchase.js');

module.exports = router;


router.post("/addPurchase", async (req, res)=>{
    console.log("adding purchase", req.body);

    type = req.body.type;
    accountId = req.body.accountId;
    amount = req.body.amount;
    date = req.body.date;
    category = req.body.category;
    description = req.body.description;

    purchaseAttributes = {
        type: type,
        accountId: new mongoose.Types.ObjectId(accountId),
        amount: amount,
        date: date,
        category: category,
    }

    const result = await Purchase.insertOne(purchaseAttributes);
    res.json(result)
})

router.get("/getPurchasesByAccountId", async (req,res) =>{
    accountId = req.query.accountId;

    try{
        const purchases = await Purchase.find({accountId: new mongoose.Types.ObjectId(accountId)});
        console.log("result is ",purchases);
        res.send(purchases);
    } catch(error){
        res.status(500).send("an error occured somehow");
    }
})

router.get("/getPurchasesByCategory", async (req,res)=>{
    category = req.body.category;
    try{
        const purchases = await Purchase.find({category: category});
        console.log(purchases)
        res.send(purchases);
    } catch(error){
        res.status(500).send("an error occured somehow");
    }
})