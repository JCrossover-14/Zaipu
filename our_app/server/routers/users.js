var mongoose = require('mongoose');
var express = require('express');
let router = express.Router();
let Users = require("../models/users")
let BankAccounts = require("../models/bankaccounts")


// get accounts 
// create new user 
router.post("/create", async (req, res) =>{
    username = req.body.username;
    email = req.body.email; 
    passwordHash = req.body.passwordHash; 
    
    let accountAttributes = {
        username: username, 
        email: email, 
        passwordHash: passwordHash, 
    }
    const result = await Users.insertOne(accountAttributes); 
    res.send(result); 
})

// add new account
router.put("/addAccount", async (req, res) => {
    const accountId = req.body.accountId; 
    const username = req.body.username; 
    let account = await BankAccounts.find({accountId: accountId}); 
    if(account.length == 0){
        res.sendStatus(400); // Bad Request: Account doesn't exist 
    }
    let result = await Users.findOneAndUpdate(
        {username: username}, 
        {$push: { accountIds: new mongoose.Types.ObjectId(account._id)}},
        {new: true, useFindAndModify: false},
    )
    res.send(result)
})

// delete account
router.put("/deleteAccount", async (req, res) =>{
    const accountId = req.body.accountId; 
    const username = req.body.username; 
    let account = await BankAccounts.find({_id: new mongoose.Types.ObjectId(accountId)}); 
    if(account.length == 0){
        res.sendStatus(400); // Bad Request: Account doesn't exist 
    }

    let result = await Users.findOneAndUpdate(
        {username: username}, 
        {$pull: { accountIds: new mongoose.Types.ObjectId(accountId)}},
        {new: true, useFindAndModify: false},
    );

    res.send(result);
})

// add category
router.put("/addCategory", async (req, res) => {
    const username = req.body.username; 
    const category = req.body.category; 

    let result = await Users.findOneAndUpdate(
        {username: username}, 
        {$push: { categories: category}},
        {new: true, useFindAndModify: false},
    );
    console.log(result)
    res.send(result);

})
// delete tag
router.put("/deleteCategory", async (req, res) =>{
    const username = req.body.username; 
    const category = req.body.category; 

    let result = await Users.findOneAndUpdate(
        {username: username}, 
        {$pull: { categories: category}},
        {new: true, useFindAndModify: false},
    );
    console.log(result)
    res.send(result);
})


module.exports = router;

// get accounts 
router.get("/getAccounts", async (req, res) => {
    const username = req.body.username; 

    let userObject = await Users.findOne({username: username}).populate("accountIds"); 

    
    
    res.send(userObject.accountIds); 
})