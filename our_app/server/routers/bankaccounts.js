var mongoose = require('mongoose');
var express = require('express');
let router = express.Router();

const app = express();

let Category = require("../models/categories");


router.post("/category", async (req, res) =>{
    console.log(req.body);
    try{
        const category = new Category(req.body);
        await category.save();
    } catch(error){
        console.log(error)
        res.status(500).send("Internal server error");
    }
    
})


