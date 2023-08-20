// import mongoose
const mongoose = require('mongoose');

// create a schema
const UserSchema =new mongoose.Schema({
   first_name: { type: String },
   last_name: { type: String },
   email: { type: String },
   gender: { type: String },
   mobile: { type: Number },
   password: { type: String },
});

// create a model 
const UserModel = mongoose.model('users', UserSchema, "user"); // name , schema, collectionName

module.exports = UserModel;
