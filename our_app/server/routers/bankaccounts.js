var mongoose = require('mongoose');
var express = require('express');
let router = express.Router();
let BankAccounts = require("../models/bankaccounts")
const app = express();

// create bank account 
router.post("/addAccount", async (req, res) => {
    type = req.body.type 
    accountId = req.body.accountId 
    balance = req.body.balance 

    accountAttributes = {
        type: type, 
        accountId: accountId, 
        balance: balance
    }

    const result = await BankAccounts.insertOne(accountAtrributes);
    return result 

})

// get accounts by accountId 
router.get("/getAccounts/:accountId", async(req, res) => {
    accountId = req.params.accountId; 

    let results = await BankAccounts.find({accountId: new mongoose.Types.ObjectId(accountId)}); 

    return results;
})

module.exports = router;