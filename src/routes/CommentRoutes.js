const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

// Tạo bình luận mới
router.post('/comments', CommentController.createComment);

// Lấy tất cả bình luận
router.get('/comments', CommentController.getComments);

// Lấy bình luận theo ID
router.get('/comments/:id', CommentController.getCommentById);

module.exports = router;
