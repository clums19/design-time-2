const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: {type: String, required: true},
    biography: {type: String, required: true},
    img: {type: String, required: true}

}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;