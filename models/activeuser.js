const mongoose = require('mongoose');
const Schema = mongoose.Schema

const blogSchema = new Schema({
    name: {type: String, required: true},
    biography: {type: String, required: true},
    img: {type: String, required: true},
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;