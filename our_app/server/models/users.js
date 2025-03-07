var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema  = mongoose.Schema;
var userSchema = new Schema({
    username:{type:String, required:true},
    email:{type:String},
    passwordHash:{type:String, required:true},
    accountIds:{type: List[String]},
});

userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password,this.passwordHash);
}


const Users = mongoose.model("User", userSchema);
module.exports= Users;
