var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const purchaseSchema = Schema({
    type: {type: String},
    accountId: {type: String},
    amount: {type: Number},
    date: {type: String},
    category: {type: String}
})

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;
