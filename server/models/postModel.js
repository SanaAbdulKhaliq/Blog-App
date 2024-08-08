const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  });

const postSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    timeStamp: {
        type: Date,
        default: Date.now
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    likes: { 
        type: Number, 
        default: 0 
    },
    
    comments: [commentSchema]
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;