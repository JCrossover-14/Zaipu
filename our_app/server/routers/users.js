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
    console.log("add account req is ", req.body);
    let account = await BankAccounts.findOne({accountId: accountId}); 
    if(account.length == 0){
        res.sendStatus(400); // Bad Request: Account doesn't exist 
    }
    let to_insert = new mongoose.Types.ObjectId(account._id);
    console.log("account is ", account, "_id is ",account._id," we are inserting ", to_insert);
    let result = await Users.findOneAndUpdate(
        {username: username}, 
        {$push: { accountIds: to_insert}},
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
    const username = req.query.username; 
    console.log("getting accounts with req body ",req.query);
    //console.log("trying to find accounts for username ",username);

    //let userObject = await Users.find({username: username}).populate("accountIds").exec(); 
    
    let userObject = await Users.findOne({username:username});

    const objectIdArray = userObject.accountIds.map(id => new mongoose.Types.ObjectId(id));
    console.log(objectIdArray);

    let accounts = await BankAccounts.find({
        _id: { $in: objectIdArray}
    });

    //const accountIdsAsStrings = accounts.map(account=>account.accountId);
    //console.log(accountIdsAsStrings);

    res.json(accounts);
})  