const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const isAuth = require('../middleware/isAuth');

router.get('/', commentController.getAllComments);
router.get('/create', isAuth, commentController.getCreateComment);
router.post('/create', isAuth, commentController.postCreateComment);
router.get('/edit/:id', isAuth, commentController.getEditComment);
router.post('/edit/:id', isAuth, commentController.postEditComment);
router.post('/delete/:id', isAuth, commentController.deleteComment);

module.exports = router;
