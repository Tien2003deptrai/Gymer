const { User, Post } = require('../models');

class UserController {
    // Tạo người dùng mới
    async createUser(req, res) {
        try {
            const { email, password, name } = req.body;
            const newUser = await User.create({ email, password, name });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Error creating user' });
        }
    }

    // Lấy tất cả người dùng
    async getUsers(req, res) {
        try {
            const users = await User.findAll(
                {
                    include: [{
                        model: Post,
                    }]
                }
            );
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching users' });
        }
    }

    // Lấy thông tin người dùng theo ID
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user' });
        }
    }
}

module.exports = new UserController();
