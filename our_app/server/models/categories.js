var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema  = mongoose.Schema;

var categorySchema = new Schema({
    name: {type: String}
});

const Category = mongoose.model("Categories". categorySchema,"categories"); 
module.exports = Category; 