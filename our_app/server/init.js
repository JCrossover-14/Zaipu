const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const axios = require("axios"); // Import axios
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

async function registerUsers() {
    for (let i = 0; i < default_users.length; i++) {
        try {
            const response = await axios.post("http://localhost:8000/register", { 
                username: default_users[i],
                email: default_emails[i],
                password: default_passwords[i],
            });
            console.log(`User ${default_users[i]} registered successfully:`, response.data);
        } catch (error) {
            console.error(`Error registering user ${default_users[i]}:`, error.response ? error.response.data : error.message);
        }
    }
}
const names = ["AMEX", "Capital One", "J.P Morgan", "Chase", "Jerry"];
const types = ["Credit", "Debit"];

async function assignAccounts(){
    for (let i = 0; i < default_users.length; i++) {
        for (let j = 0; j < 3; j++) {
            var accountIndex = i * 3 + j; // Ensure valid account index
            if (accountIndex >= default_accounts.length) break; // Stop if we exceed the number of accounts

            try {
                const response = await axios.post("http://localhost:8000/accounts/addAccount", {
                    type: types[(accountIndex%2)],
                    accountId: default_accounts[accountIndex],
                    balance: default_balance[accountIndex],
                    name: names[(accountIndex%5)]
                });
                console.log(`Account ${default_accounts[accountIndex]} added successfully`);
            } catch (error) {
                console.error(`Error posting account ${default_accounts[accountIndex]}:`, error);
            }

            try {
                const response = await axios.put("http://localhost:8000/user/addAccount", {
                    accountId: default_accounts[accountIndex],
                    username: default_users[i],
                });
                console.log(`Added account ${default_accounts[accountIndex]} successfully to user ${default_users[i]}`);
            } catch (error) {
                console.error(`Error adding account ${default_accounts[accountIndex]} to user ${default_users[i]}:`, error);
            }
        }
    }
}

async function init() {
    await registerUsers(); // Ensure registration is complete before adding accounts
    await assignAccounts(); // Assign accounts after user registration
}

init(); // Start the process



