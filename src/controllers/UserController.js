const { User, Post } = require('../models');
const bcrypt = require('bcrypt');
const { accessToken, refreshToken } = require('../utils/generateToken');
class UserController {
    async registerUser(req, res) {
        try {
            const { password, email } = req.body;

            const existingUser = await User.findOne({
                where: { email },
            });

            if (existingUser) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            const saltRounds = 5;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = await User.create({
                email,
                password: hashedPassword,
            });

            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Error registering user' });
        }
    }

    async loginUser(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            const token = accessToken(user.id);
            const refreshTokenJwt = refreshToken(user.id);

            res.status(200).json({ message: 'Login successful', user, token, refreshTokenJwt });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Login failed' });
        }

    }

    async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json({ message: 'success', users: users });
        } catch (error) {
            res.status(500).json({ error: 'Login failed' });
        }
    }
}

module.exports = new UserController();
