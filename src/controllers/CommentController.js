const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');

class CommentController {
    // Tạo bình luận mới
    async createComment(req, res) {
        try {
            const { content, userId, postId } = req.body;

            const user = await User.findByPk(userId);
            const post = await Post.findByPk(postId);
            if (!user) return res.status(404).json({ error: 'User not found' });
            if (!post) return res.status(404).json({ error: 'Post not found' });

            const newComment = await Comment.create({ content, userId, postId });
            res.status(201).json(newComment);
        } catch (error) {
            res.status(500).json({ error: 'Error creating comment' });
        }
    }

    // Lấy tất cả bình luận
    async getComments(req, res) {
        try {
            const comments = await Comment.findAll();
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching comments' });
        }
    }

    // Lấy bình luận theo ID
    async getCommentById(req, res) {
        try {
            const { id } = req.params;
            const comment = await Comment.findByPk(id);
            if (!comment) return res.status(404).json({ error: 'Comment not found' });
            res.status(200).json(comment);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching comment' });
        }
    }

    async getUsersByStartingLetter(req, res) {
        try {
            const { letter } = req.query; // Ví dụ: letter = 'A'
            const users = await User.findAll({
                where: {
                    name: {
                        [Op.like]: `${letter}%`  // Tên bắt đầu bằng ký tự được truyền vào
                    }
                }
            });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching users' });
        }
    }
}

module.exports = new CommentController();
