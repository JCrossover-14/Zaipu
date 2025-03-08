var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const purchaseSchema = Schema({
    type: {type: String},
    accountId: {type: Schema.Types.ObjectId, ref: "BankAccounts"},
    amount: {type: Number},
    date: {type: Date},
    category: {type: String}
})

const Purchases = mongoose.model("Purchases", purchaseSchema);
module.exports = Purchases;
