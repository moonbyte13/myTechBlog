const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }]
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    if(req.session.loggedIn) { // checking existence of session object before accessing its property
      res.render('homepage', { posts, loggedIn: true });
    } else {
      res.render('homepage', { posts, loggedIn: false });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// GET dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Post
      }],
    });

    const user = userData.get({
      plain: true
    });

    res.render('homepage', {
      user,
      loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET details with single post
router.get('/details/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username'] }]
    });

    const post = postData.get({ plain: true });

    if(req.session.loggedIn) {
      res.render('postDetails', { post, loggedIn: true });
    } else {
      res.render('postDetails', { post, loggedIn: false });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET sign up
router.get('/signUp', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/');
  }
  res.render('signUp');
});

// GET login
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    return res.redirect('/');
  }

  res.render('login');
});

router.get('/createPostForm', withAuth, async (req, res) => {
  if (req.session.loggedIn) {
    try {
      const userData = await User.findOne({
        where: { id: req.session.userId },
        attributes: { exclude: ['password'] }
      });
      res.render('createPost', { userData, loggedIn: true });
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

module.exports = router;