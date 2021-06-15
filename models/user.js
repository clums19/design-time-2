const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const userSchema = Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    biography: {type: String}
})


const User = mongoose.model('User', userSchema);

// Export
module.exports = User;