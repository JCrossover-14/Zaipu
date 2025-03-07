var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var bankAccountSchema = new Schema({
    type: {type: String},
    accountId: {type: String}
})


const BankAccount = mongoose.model("bankAccount", bankAccountSchema); 
module.exports = BankAccount; 