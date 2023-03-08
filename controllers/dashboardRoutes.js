const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      userId: req.session.userId
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
    },
    {
      model: User,
      attributes: ['username']
    }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({
        plain: true
      }));
      res.render('dashboard', {
        posts,
        loggedIn: true
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one post
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
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
    },
    {
      model: User,
      attributes: ['username']
    }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({
          message: 'No post found with this id'
        });
        return;
      }

      const post = dbPostData.get({
        plain: true
      });

      res.render('edit-post', {
        post,
        loggedIn: true
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;