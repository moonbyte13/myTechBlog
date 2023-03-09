const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { userId: req.session.userId },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'postId', 'userId', 'created_at'],
          include: { model: User, attributes: ['username'] } // nested include added for User model data associated with Comment model data
        }, // end of Comment include object

        {
          model: User, attributes: ['username']
        } // added for User model data associated with Post model data

      ] // end of include array

    }); // end of Post.findAll()

    res.render('dashboard', { posts, loggedIn: true });

  } catch (err) {
    console.log(err); res.status(500).json(err);
  }// error handling added to catch any errors thrown by Post.findAll()
}); // end of router get

// get one post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'content',
        'created_at'
      ],
      include: [{
        model: Comment,
        attributes: ['id', 'comment_text', 'postId', 'userId', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
      ,{
        model: User,
        attributes: ['username']
      }]
    });

    if (!post) {
      return res.status(404).json({ message: 'No post found with this id' });
    }

    res.render('edit-post', { post, loggedIn: true });

  } catch (err) {
    console.log(err); res.status(500).json(err);
  }
});

module.exports = router;