const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create your User Model
const factSchema = new mongoose.Schema({
    text: String
}, {
    timestamps: true
});


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    facts: [factSchema],
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);