var mongoose = require('mongoose');
var express = require('express');
let router = express.Router();
let Deposit = require('../models/deposit.js');


router.post("/addDeposit", async (req, res) =>{
    console.log("adding deposit req body is ",req.body);
    type = req.body.type;
    accountId = req.body.accountId;
    amount = req.body.amount;
    date = req.body.date;

    let depositAttributes = {
        type:type,
        accountId: accountId,
        amount: amount,
        date: date,
    }

    const result = await Deposit.insertOne(depositAttributes);
    res.send(result);
})


router.get("/getDepositsByAccountId", async (req,res) =>{
    console.log("getting purchases req body is ",req.body);
    accountId = req.body.accountId;

    try{
        const deposits = await Deposit.find({accountId: accountId});
        //console.log("result is ",purchases);
        res.json(deposits);
    } catch(error){
        res.status(500).send("an error occured somehow");
    }
})

module.exports = router;