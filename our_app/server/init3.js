const moment = require("moment");
const axios = require("axios");
const mongoose = require("mongoose");
const BankAccounts = require('./models/bankaccounts.js');


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

const default_users = ["jcrossover_14", "jerrychessplayer", "andrew_fung", "Tim_Duncan", "Josh_Giddey69"];
const default_emails = ["ruijie.xiao@stonybrook.edu","jerrychessplayer@gmail.com", "andrew.fung@stonybrook.edu", "2013heat@nba.com", "hello911@gmail.com"];
const default_passwords = [
    "hello", 
    "hello123",
    "twothreezone",
    "rayallenshot",
    "children"
];
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

const categoryAverages = {
    "Housing/Utilities": { interval: 30, min: 150, max: 300 },
    "Food/Groceries": { interval: 7, min: 45, max: 70 },
    "Transportation": { interval: 7, min: 30, max: 80 },
    "Shopping/Personal Expenses": { interval: 20, min: 20, max: 100 },
    "Healthcare/Insurance": { interval: 60, min: 50, max: 200 },
    "Debt/Loans": { interval: 30, min: 100, max: 500 },
    "Entertainment/Leisure": { interval: 30, min: 30, max: 100 }
};
// Function to add purchase via API call
async function addPurchase(account, category, description, amount, date) {
    console.log("account associated with id is ", account);
    console.log("parameters are ", "Purchase ", account._id.toString(), " ", amount," ", date.toString(), " ",category, " ", description);
    const purchaseData = {
        type: "Purchase",
        accountId: account._id.toString(),
        amount: amount.toString(),
        date: date,
        category: category,
        description: description
    };

    console.log("Sending data to backend:", purchaseData);

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

async function generateExpenses() {
    for (let user of default_users) {
        for (let accountId of default_accounts) {
            let account = await BankAccounts.findOne({ accountId: accountId });
            if (!account) continue;

            for (let category of default_categories) {
                const { interval, min, max } = categoryAverages[category];
                for (let day = 0; day < 365; day += interval) {
                    const date = moment().startOf("year").add(day, 'days').format("YYYY-MM-DD");
                    const amount = Math.floor(Math.random() * (max - min + 1)) + min;
                    await addPurchase(account, category, "This is a test and is assigned a random tag", amount, date);
                }
            }
        }
    }
}


async function generateDeposits() {
    let depositFrequencies = [14, 30]; // Biweekly or Monthly deposits
    let depositAmounts = { min: 800, max: 3000 }; // Random salary range
    
    for (let user of default_users) {
        let frequency = depositFrequencies[Math.floor(Math.random() * depositFrequencies.length)];
        
        for (let day = 0; day < 365; day += frequency) {
            const depositDate = moment().startOf("year").add(day, 'days').format("YYYY-MM-DD");
            const amount = Math.floor(Math.random() * (depositAmounts.max - depositAmounts.min)) + depositAmounts.min;
            
            let randomAccountId = default_accounts[Math.floor(Math.random() * default_accounts.length)];
            let account;
            try {
                account = await BankAccounts.findOne({ accountId: randomAccountId });
            } catch (error) {
                console.error("Error finding account for deposit:", error);
                continue;
            }
            
            if (account) {
                await addDeposit(account, amount, depositDate);
                console.log(`Deposit added: ${amount} to ${randomAccountId} on ${depositDate}`);
            }
        }
    }
}

generateDeposits();
generateExpenses();
