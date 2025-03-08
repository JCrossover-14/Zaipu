const moment = require("moment"); // for date manipulation
const axios = require("axios");
let mongoose = require("mongoose");
const BankAccounts = require('./models/bankaccounts.js');
const default_users = ["jcrossover_14", "jerrychessplayer", "andrew_fung", "Tim_Duncan", "Josh_Giddey69"];
const default_emails = ["ruijie.xiao@stonybrook.edu","jerrychessplayer@gmail.com", "andrew.fung@stonybrook.edu", "2013heat@nba.com", "hello911@gmail.com"];
const default_passwords = [
    "hello", 
    "hello123",
    "twothreezone",
    "rayallenshot",
    "children"
];

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
const default_categories = [
    "Housing/Utilities",
    "Food/Groceries",
    "Transportation",
    "Shopping/Personal Expenses",
    "Healthcare/Insurance",
    "Debt/Loans",
    "Entertainment/Leisure"
];

const default_accounts = [
    "4532958473629485",
    "5214027896541236",
    "3764829156372841",
    "6011578493021765",
    "4916823645872134",
    "5392018456732958",
    "3485961273846591",
    "6011987654321234",
    "4532918574623198",
    "5236147893562417",
    "3748291658374652",
    "6011432895763219",
    "4916537281943625",
    "5291847632514879",
    "3498275614382956"];

const default_balance = [49091, 52726, 85654, 4535, 43462, 13746, 3897, 60390, 17429, 92316, 66312, 64500, 73489, 81985, 82517];

const categoryDescriptions = {
  Food: ["Grocery Shopping", "Eating Out - Restaurant", "Eating Out - Fast Food", "Cafe", "Takeout"],
  Entertainment: ["Movie", "Concert", "Event", "Streaming Subscription", "Gaming"],
  Bills: ["Rent", "Electricity", "Water", "Internet", "Phone Bill"],
  Transportation: ["Gas", "Car Maintenance", "Public Transport", "Parking Fee", "Tolls"],
  Miscellaneous: ["Shopping", "Gift", "Medical", "Clothing", "Miscellaneous"]
};

const categoryAverages = {
  Food: { weekly: { min: 45, max: 70 }, diningOut: { min: 10, max: 50 } },
  Entertainment: { monthly: { min: 30, max: 100 } },
  Bills: { monthly: { min: 150, max: 300 } },
  Transportation: { weekly: { min: 30, max: 80 } },
  Miscellaneous: { monthly: { min: 20, max: 100 } }
};

// Function to add purchase via API call
async function addPurchase(account, category, description, amount, date) {
    console.log("account associated with id is ", account);
    const purchaseData = {
        type: "Purchase",
        accountId: account._id,
        amount: amount,
        date: date,
        category: category,
        description: description
    };

    try {
        const response = await axios.post("http://localhost:8000/purchases/addPurchase", purchaseData);
        console.log("Purchase added:", response.data, " vs objectId of parent", account._id);
    } catch (error) {
        console.error("Error adding purchase:", error.response ? error.response.data : error.message);
    }
}

// Function to add deposit via API call
async function addDeposit(account, amount, date) {
    const depositData = {
        type: "Deposit",
        accountId: account._id,
        amount: amount,
        date: date
    };

    try {
        const response = await axios.post("http://localhost:8000/deposit/addDeposit", depositData);
        //console.log("Deposit added:", response.data);
    } catch (error) {
        console.error("Error adding deposit:", error.response ? error.response.data : error.message);
    }
}

// Function to generate category data and make API calls to store transactions
async function generateCategoryData(user, category, accountId) {
    let transactions = [];
    let daysInYear = 365;
    let categoryDesc = categoryDescriptions[category];
    let avg = categoryAverages[category];
    let x;
    try {
        console.log("trying to look for ", accountId);
        x = await BankAccounts.findOne({accountId:accountId});
    } catch (error){
        console.log("something baaaad happneed");
    }

    for (let i = 0; i < daysInYear; i++) {
        const date = moment().startOf("year").add(i, 'days').format("YYYY-MM-DD");

        // Handle weekly/monthly generation for each category
        if (category === "Food") {
            if (i % 7 === 0) {
                const description = categoryDesc[Math.floor(Math.random() * 3)];
                const amount = Math.floor(Math.random() * (avg.weekly.max - avg.weekly.min)) + avg.weekly.min;
                transactions.push({ user, date, category, description, amount });
                console.log("we are looking for bank account with id ", accountId);

                addPurchase(x, category, description, amount, date);  // API call to add purchase
            } else if (i % 3 === 0) {
                const description = categoryDesc[1 + Math.floor(Math.random() * 2)];
                const amount = Math.floor(Math.random() * (avg.diningOut.max - avg.diningOut.min)) + avg.diningOut.min;
                transactions.push({ user, date, category, description, amount });
                console.log("we are looking for bank account with id ", accountId);
                addPurchase(x, category, description, amount, date);  // API call to add purchase
            }
        }

        if (category === "Entertainment") {
            if (i % 30 === 0) {
                const description = categoryDesc[Math.floor(Math.random() * categoryDesc.length)];
                const amount = Math.floor(Math.random() * (avg.monthly.max - avg.monthly.min)) + avg.monthly.min;
                transactions.push({ user, date, category, description, amount });
                console.log("we are looking for bank account with id ", accountId);
                addPurchase(x, category, description, amount, date);  // API call to add purchase
            }
        }

        if (category === "Bills") {
            if (i % 30 === 0) {  // Monthly bills
                const description = categoryDesc[Math.floor(Math.random() * categoryDesc.length)];
                const amount = Math.floor(Math.random() * (avg.monthly.max - avg.monthly.min)) + avg.monthly.min;
                transactions.push({ user, date, category, description, amount });
                console.log("we are looking for bank account with id ", accountId);
                addPurchase(x, category, description, amount, date);  // API call to add purchase
            }
        }

        if (category === "Transportation") {
            if (i % 7 === 0) {  // Weekly transportation costs
                const description = categoryDesc[Math.floor(Math.random() * categoryDesc.length)];
                const amount = Math.floor(Math.random() * (avg.weekly.max - avg.weekly.min)) + avg.weekly.min;
                transactions.push({ user, date, category, description, amount });
                console.log("we are looking for bank account with id ", accountId);
                addPurchase(x, category, description, amount, date);  // API call to add purchase
            }
        }

        if (category === "Miscellaneous") {
            if (i % 30 === 0) {  // Monthly misc
                const description = categoryDesc[Math.floor(Math.random() * categoryDesc.length)];
                const amount = Math.floor(Math.random() * (avg.monthly.max - avg.monthly.min)) + avg.monthly.min;
                transactions.push({ user, date, category, description, amount });
                console.log("we are looking for bank account with id ", accountId);
                addPurchase(x, category, description, amount, date);  // API call to add purchase
            }
        }
    }

    return transactions;
}

// Function to generate and add data for all users and categories
async function generateData() {
    let allData = [];
    for (let user of default_users) {
        for (let category of default_categories) {
            for (let accountId of default_accounts) {
                let categoryData = await generateCategoryData(user, category, accountId); // Await here
                allData = allData.concat(categoryData);
            }
        }
    }

    console.log("Generated Data:", allData);
    return allData;
}

// Call generateData and wait for it to finish



// Function to generate and add deposits (simulate incoming deposits)
async function generateDeposits() {
    for (let user of default_users) {
        for (let accountId of default_accounts) { // Replace with actual account IDs
            const depositAmount = Math.floor(Math.random() * 500) + 100;  // Random deposit between 100-600
            const depositDate = moment().format("YYYY-MM-DD");
            //console.log("we are looking for bank account with id ", accountId);
            await addDeposit(accountId, depositAmount, depositDate);
        }
    }
}

// Call the function to generate and store data
generateData();
generateDeposits(); 