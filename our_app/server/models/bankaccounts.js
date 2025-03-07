var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var bankAccountSchema = new Schema({
    type: {type: String},
    accountId: {type: String},
    balance: {type: Number}
})


const BankAccount = mongoose.model("bankAccount", bankAccountSchema); 
module.exports = BankAccount; 