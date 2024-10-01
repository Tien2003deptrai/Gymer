const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

// Tạo bài viết mới
router.post('/posts', PostController.createPost);

// Lấy tất cả bài viết
router.get('/posts', PostController.getPosts);

// Lấy bài viết theo ID
router.get('/posts/:id', PostController.getPostById);

module.exports = router;
