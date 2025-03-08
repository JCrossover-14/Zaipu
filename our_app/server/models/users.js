var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema  = mongoose.Schema;
var userSchema = new Schema({
    username:{type:String, required:true},
    email:{type:String},
    passwordHash:{type:String, required:true},
    accountIds: {type: [{ type: Schema.Types.ObjectId, ref: "BankAccounts"}], default: []}, 
    categories: {type: [String], default: ["Housing/Utilities","Food/Groceries","Transportation","Shopping/Personal Expenses","Healthcare/Insurance", "Debt/Loans", "Entertainment/Leisure"]}, 
});

userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password,this.passwordHash);
}


const Users = mongoose.model("Users", userSchema);
module.exports= Users;
