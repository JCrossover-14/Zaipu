const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const depositSchema = Schema({
    type:{type:String},
    accountId:{type: Schema.Types.ObjectId, ref: "BankAccounts"},
    amount:{type:Number},
    date:{type:Date},
})

const Deposits = mongoose.model("Deposits", depositSchema);
module.exports = Deposits;