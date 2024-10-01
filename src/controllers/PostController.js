const { User, Post, Comment, Op } = require("../models");

class PostController {
    // Tạo bài viết mới
    async createPost(req, res) {
        try {
            const { title, content, userId } = req.body;
            const user = await User.findByPk(userId);
            if (!user) return res.status(404).json({ error: 'User not found' });

            const newPost = await Post.create({ title, content, userId });
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({ error: 'Error creating post' });
        }
    }

    // Lấy tất cả bài viết
    async getPosts(req, res) {
        try {
            const { searchText } = req.query;
            const posts = await Post.findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.like]: `%${searchText || ''}%` } },
                        { content: { [Op.like]: `%${searchText || ''}%` } }
                    ]
                },
                include: [{
                    model: Comment,
                }]
            });
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching posts' });
        }
    }

    // Lấy bài viết theo ID
    async getPostById(req, res) {
        try {
            const { id } = req.params;
            const post = await Post.findByPk(id, {
                include: [
                    {
                        model: Comment
                    }
                ]
            });
            if (!post) return res.status(404).json({ error: 'Post not found' });
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching post' });
        }
    }
}

module.exports = new PostController();
