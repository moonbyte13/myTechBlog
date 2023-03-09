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
    if(req.session.loggedIn) {
      const uData = await User.findOne({
        where: { id: req.session.userId },
        attributes: { exclude: ['password'] }
      });
      res.render('homepage', { posts, uData, loggedIn: req.session.loggedIn });
    } else {
      res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    }
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
  if (!req.session.loggedIn) {
    res.render('postin');
    return;
  }

  res.redirect('/dashboard');
});

// GET sign up
router.get('/signUp', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/dashboard');
  }
  res.render('signUp');
});

// GET login
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    return res.redirect('/dashboard');
  }

  res.render('login');
});

module.exports = router;