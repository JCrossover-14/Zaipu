var mongoose = require('mongoose');
var express = require('express');
let router = express.Router();
const Deposit = require('../models/deposit.js');


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


router.get("/getDepositsByAccountId", async (req, res) => {
    console.log("getting deposits req query is ", req.query);
    const accountId = req.query.accountId;

    if (!mongoose.Types.ObjectId.isValid(accountId)) {
        console.log("accountId is not valid");
        return res.status(400).send("Invalid accountId format");
    } else {
        console.log("accountId is valid");
    }

    try {
        console.log("trying to find in deposits");
        const deposits = await Deposit.find({ accountId: new mongoose.Types.ObjectId(accountId) });
        console.log("found deposits: ", deposits);
        res.json(deposits);
    } catch (error) {
        console.error("Error fetching deposits:", error);
        res.status(500).send("An error occurred somehow");
    }
});


module.exports = router;