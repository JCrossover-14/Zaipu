var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bankAccountSchema = new Schema({
    type: {type: String},
    name: {type: String}, 
    accountId: {type: String},
    balance: {type: Number}
})


const BankAccounts = mongoose.model("BankAccounts", bankAccountSchema); 
module.exports = BankAccounts; 