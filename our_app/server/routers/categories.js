let express = require('express');
let router = express.Router();
let Categories = require("../models/categories");
const mongoose = require("mongoose"); 

// create a new list of cateogries for new user 
router.post("/create/:user_id", async (req, res) =>{
    user_id = req.params.id = user_id; 
    Categories.create({user_id: mongoose.Types.ObjectId(user_id), cateogires: []})
}) 

// find categories based on user_id 
router.get("/getByUserId/:user_id", async (req, res) => {
    try{
        user_id = req.params.user_id; 
        item = await Categories.findOne({user_id: user_id});
        if (!item) {
            return res.status(404).json({ message: "Categories not found for the given user" });
        }
        res.send(item.categories);
    }catch(err){
        res.send([]);
    }
})

