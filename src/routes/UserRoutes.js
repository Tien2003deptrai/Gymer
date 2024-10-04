const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authenticateJWT = require('../middlewares/authMiddleware');

// Tạo người dùng mới
router.post('/register', UserController.registerUser);

router.post('/login', UserController.loginUser);

router.get('/', authenticateJWT, UserController.getAllUsers);

module.exports = router;
