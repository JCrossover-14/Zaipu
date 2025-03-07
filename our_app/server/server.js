const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

/*
const BankAccounts = require("./models/bankaccounts.js");
const Purchase = require("./models/purchase.js");
const User = require("./models/users.js");
const Category = require("./models/categories.js");
*/

const User = require("./models/users.js");


const mongoURI = "mongodb://localhost:27017/HackKnight2025";
mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () =>{
    console.log("Connected to Mongo");
})

const bankaccountRoute = require("./routers/bankaccounts"); 
const purchasesRoute = require("./routers/purchase");
const usersRoute = require("./routers/users")

app.use("/bank", bankaccountRoute);
app.use("/purchases", purchasesRoute);
app.use("/user", usersRoute); 

app.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user) {
            return res.status(401).send("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(req.body.password, user.passwordHash);
        if(!isMatch){
            return res.status(401).send("Invalid email or password.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error in user login");
    }
});


