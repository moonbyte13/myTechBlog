// import required modules
const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID and include the associated posts and comments for that user
    const postData = await Post.findAll({
      where: { userId: req.session.userId },
      attributes: ['id', 'title', 'postContent', 'createdAt'],
      include: [
        {
          model: User, attributes: ['username']
        } // added for User model data associated with Post model data

      ] // end of include array

    }); // end of Post.findAll()

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    // Set the session username to a variable
    const username = req.session.username;
    // Pass serialized data and session flag into template
    res.render('dashboard', { posts, username, loggedIn: true });

  } catch (err) {
    console.log(err); res.status(500).json(err);
  }// error handling added to catch any errors thrown by Post.findAll()
}); // end of router get

// get one post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID and include the associated posts
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
      include: [
        {
          model: User,
          attributes: ['username']
        }]
    });

    // If no post found, throw error
    if (!post) {
      return res.status(404).json({ message: 'No post found with this id' });
    }

    // Respond with the post data
    res.render('edit-post', { post, loggedIn: true });

  } catch (err) {
    console.log(err); res.status(500).json(err);
  }
});

module.exports = router;