var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema  = mongoose.Schema;

var categorySchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: "User", required: True},
    categories: {type: [String], default: [], required: True} 
})

const Categories = mongoose.model("categories". categorySchema); 
module.exports = Categories; 