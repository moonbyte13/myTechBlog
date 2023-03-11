const User = require('./User');
const Post = require('./Post');

// user has many posts
User.hasMany(Post, {
  foreignKey: 'userId'
});

// post belongs to user
Post.belongsTo(User, {
  foreignKey: 'userId',
});


module.exports = {User, Post};