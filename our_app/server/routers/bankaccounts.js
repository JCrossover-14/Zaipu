var mongoose = require('mongoose');
var express = require('express');
let router = express.Router();
let BankAccounts = require("../models/bankaccounts")
const app = express();

// create bank account 
router.post("/addAccount", async (req, res) => {
    let type = req.body.type;
    let accountId = req.body.accountId;
    let balance = req.body.balance;
    let name = req.body.name;

    accountAttributes = {
        type: type, 
        accountId: accountId, 
        balance: balance,
        name: name
    }

    const result = await BankAccounts.insertOne(accountAttributes);
    // return result 
    res.send(result)
})

// get accounts by accountId 
router.get("/getAccounts/:accountId", async(req, res) => {
    accountId = req.params.accountId; 
    console.log("accountid that works is ", accountId);
    let results = await BankAccounts.find({accountId: accountId}); 
    res.send(results);
})

module.exports = router;