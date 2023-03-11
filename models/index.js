const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// user has many posts
User.hasMany(Post, {
  foreignKey: 'userId'
});

// post belongs to user
Post.belongsTo(User, {
  foreignKey: 'userId',
});

// user has many comments
User.hasMany(Comment, {
  foreignKey: 'userId'
});

// comment belongs to user
Comment.belongsTo(User, {
  foreignKey: 'userId',
});

// post has many comments
Post.hasMany(Comment, {
  foreignKey: 'postId'
});

// comment belongs to post
Comment.belongsTo(Post, {
  foreignKey: 'postId',
});


module.exports = {User, Post, Comment};