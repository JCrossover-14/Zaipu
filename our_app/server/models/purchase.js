var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const purchaseSchema = Schema({
    type: {type: String, required: true},
    accountId: {type: Schema.Types.ObjectId, ref: "BankAccounts"},
    amount: {type: Number, required: true},
    date: {type: Date, required: true},
    category: {type: String},
})

const Purchases = mongoose.model("Purchases", purchaseSchema);
module.exports = Purchases;
