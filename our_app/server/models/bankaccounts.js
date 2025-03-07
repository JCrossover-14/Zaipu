var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var bankAccountSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: "User", required: True},
    accounts: {type: [String], default: [], required: True}
})


const BankAccounts = mongoose.model("bankAccounts", bankAccountSchema); 
module.exports = BankAccounts; 