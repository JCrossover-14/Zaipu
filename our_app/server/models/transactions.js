var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    transaction_id: {type: String, required: True},
    category: {type: Schema.Types.ObjectId, ref: "Categories", required: True}
})

const Transactions = mongoose.model("transactions", transactionSchema); 
module.exports = Transactions; 