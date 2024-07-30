const Comment = require('../models/Comment');

exports.getCreateComment = (req, res) => {
    res.render('createComment');
};

exports.postCreateComment = async (req, res) => {
    const { content, tags } = req.body;
    try {
        const comment = new Comment({ content, tags: tags.split(',').map(tag => tag.trim()) });
        await comment.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while creating the comment.');
    }
};

exports.getEditComment = async (req, res) => {
    const commentId = req.params.id;
    try {
        const comment = await Comment.findById(commentId);
        res.render('createComment', { comment });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving the comment.');
    }
};

exports.postEditComment = async (req, res) => {
    const commentId = req.params.id;
    const { content, tags } = req.body;
    try {
        await Comment.findByIdAndUpdate(commentId, { content, tags: tags.split(',').map(tag => tag.trim()) });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating the comment.');
    }
};

exports.deleteComment = async (req, res) => {
    const commentId = req.params.id;
    try {
        await Comment.findByIdAndDelete(commentId);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the comment.');
    }
};

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.render('index', { comments });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving comments.');
    }
};
