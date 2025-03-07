var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')

var Schema  = mongoose.Schema;
var userSchema = new Schema({
    username:{type:String, required:true},
    email:{type:String, required:true},
    passwordHash:{type:String, required:true}
});

userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password,this.passwordHash);
}



const User = mongoose.model("User", userSchema);
module.exports= User;
