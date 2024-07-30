const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    tags: [String]  // Adicionando suporte para tags
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
