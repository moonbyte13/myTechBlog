const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// user has many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// post belongs to user
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// comment belongs to user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// comment belongs to post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// user has many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// post has many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = {User, Post, Comment};