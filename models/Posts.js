const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
        title: String,
        description: String,
        image: String,
        likes: Number
});

const Post = mongoose.model('posts', PostSchema);

module.exports = Post;