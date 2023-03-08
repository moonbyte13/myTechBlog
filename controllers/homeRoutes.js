const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {

    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [{
        model: User,
        attributes: ['username'],
      },],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get(
      {
        plain: true
      }
    ));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET dashboard
router.get('/dashboard', withAuth, async (req, res) => {
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

// GET postin
router.get('postin', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('postin');
});

// GET sign up
router.get('/signUp', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signUp');
});

// GET login
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;