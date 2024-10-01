const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const { Op } = require('sequelize');

// Mối quan hệ giữa User và Post (1-n)
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

// Mối quan hệ giữa User và Comment (1-n)
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

// Mối quan hệ giữa Post và Comment (1-n)
Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

module.exports = {
    User,
    Post,
    Comment,
    Op
};

