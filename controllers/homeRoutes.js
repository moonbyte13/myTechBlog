const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }]
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    if(req.session.loggedIn) { // checking existence of session object before accessing its property
      // Set the session username to a variable
      const username = req.session.username;
      // Set the session user id to a variable
      const uId = req.session.userId;
      // Respond with the homepage template and the serialized data
      res.render('homepage', { posts, username, uId, loggedIn: true });
    } else {
      res.render('homepage', { posts, loggedIn: false });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// GET details with single post
router.get('/details/:id', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    // FIXME: jumping straight to line 63 without getting the post data
    // NOTE: only started after adding the model: Comment to the include array
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'username'] },
        { model: Comment,
          attributes: ['id', 'commentText', 'userId', 'post_id', 'createdAt'], include: [{ model: User, attributes: ['username'] }],
          where: { postId: req.params.id }
        }
      ]
    });


    // Serialize data so the template can read it
    const post = postData.get({ plain: true });

    // Respond with the homepage template and the serialized data
    if(req.session.loggedIn) {
      // Set the session username to a variable
      const username = req.session.username;
      // Set the session user id to a variable
      const uId = req.session.userId;
      // Respond with the homepage template and the serialized data
      res.render('postDetails', { post, username, comments, uId, loggedIn: true });
    } else {
      res.render('postDetails', { post, loggedIn: false });
    }
  } catch (err) {
    res.status(500).json(err);
  }
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
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    try {
      // Get all posts and JOIN with user data
      const userData = await User.findOne({
        where: { id: req.session.userId },
        attributes: { exclude: ['password'] }
      });
      // Set the session username to a variable
      const username = req.session.username;
      // Set the session user id to a variable
      const uId = req.session.userId;
      // Respond with the homepage template and the serialized data
      res.render('createPost', { userData, username, uId, loggedIn: true });
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

router.get('/editPost/:id', withAuth, async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    try {
      // Get all posts and JOIN with user data
      const postData = await Post.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ['password'] }
      });
      // Serialize data so the template can read it
      const post = postData.get({ plain: true });
      // Set the session username to a variable
      const username = req.session.username;
      // Set the session user id to a variable
      const uId = req.session.userId;
      // Respond with the homepage template and the serialized data
      res.render('editPost', { post, username, uId, loggedIn: true });
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

module.exports = router;