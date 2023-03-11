const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Comment model
class Comment extends Model {}

// create fields/columns for Comment model
Comment.init(
  {
    // define an id column
    id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // in SQL, this is the equivalent of the `PRIMARY KEY` option
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true
    },
    // define a comment column
    commentText: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the comment must be at least one character long
        len: [1]
      }
    },
    // define a user id column
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    // define a post id column
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;