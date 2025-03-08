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

app.use("/accounts", bankaccountRoute);
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


app.post("/register", async (req, res) => {
    try {
      //check if user already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).send("User already exists with this email.");
      }
  
      //hash the password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(req.body.password, salt);
  
      //create a new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        passwordHash,
      });
  
      //save the user
      const savedUser = await newUser.save();
      res
        .status(201)
        .json({ message: "User created successfully", userId: savedUser._id });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error in registering new user");
    }
  });

  app.get("/", async (req, res) =>{
    res.send("hi");
  })

<<<<<<< HEAD
  app.listen(8000, () => {
    console.log(`App listening on port 8000`)
  });
  
=======
  const server = app.listen(8000, () => {
    console.log("Server started at http://localhost:8000");
  });
  
  // SIGINT signal handler
  process.on("SIGINT", function () {
    server.close(() => {
      console.log("Server closed.");
      //removed callback use promise
      mongoose.connection
        .close()
        .then(() => {
          console.log("MongoDB disconnected on app termination");
          process.exit(0);
        })
        .catch((error) => {
          console.error("Error during disconnection", error);
          process.exit(1);
        });
    });
  });
>>>>>>> refs/remotes/origin/main
