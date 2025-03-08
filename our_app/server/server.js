const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // Allow cookies and authentication headers
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
};


app.use(cors(corsOptions));
app.use(express.json());

const session = require("express-session");

app.use(
  session({
    secret:"some secret key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000*60*60,
    },
  })
);

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
const usersRoute = require("./routers/users");
const depositRoute = require("./routers/deposit");

app.use("/accounts", bankaccountRoute);
app.use("/purchases", purchasesRoute);
app.use("/user", usersRoute); 
app.use("/deposit", depositRoute);

app.post("/login", async (req,res)=>{
    try{
      console.log("req body for logging in is ", req.body);  
      const user = await User.findOne({username: req.body.username});
        if(!user) {
            return res.status(401).send("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(req.body.password, user.passwordHash);
        if(!isMatch){
            return res.status(401).send("Invalid email or password.");
        }

        req.session.userId = user._id;
        req.session.user = {email: user.email, username: user.username};
        res.status(200).send("Logged in successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error in user login");
    }
});


app.get("/userInfo", async (req,res) =>{
  if(req.session.user){
    try{
      const user = await User.findById(req.session.userId);
      if (!user){
        return res.status(404).send("User not found");
      }

      res.json({
        email: user.email,
        username: root.username,
        id: user._id,
        role:user.role,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
  else{
    res.status(401).send("No active session");
  }
}
)

app.post("/register", async (req, res) => {
    try {
      //check if user already exists
      console.log(req.body);
      var existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).send("User already exists with this email.");
      }

      existingUser = await User.findOne({username:req.body.username});
      if(existingUser){
        return res.status(400).send("User already exists with this username.");
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
