const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Tạo người dùng mới
router.post('/users', UserController.createUser);

// Lấy tất cả người dùng
router.get('/users', UserController.getUsers);

// Lấy người dùng theo ID
router.get('/users/:id', UserController.getUserById);

module.exports = router;
