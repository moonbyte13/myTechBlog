// import required modules and models
const router = require('express').Router();
const { User, Post } = require('../../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    // Find all posts and include the associated user's username
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Map post data to plain objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.json({ posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/post
router.post('/post', async (req, res) => {
  try {
    // If post model not found, throw error
    if (!Post) {
      throw new Error('Post model not found');
    }
    req.body.userId = await req.session.userId;
    // Create a new post
    const postData = await Post.create({
      // spread operator to spread out the key/value pairs from the req.body object
      ...req.body,
    });

    // respond with the new post data
    res.status(200).json(postData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Post creation failed' });
  }
});

// PUT /api/post
router.put('/post/:id', async (req, res) => {
  try {
    // Update a post by its `id` value
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // If no post found, throw error
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    // respond with the updated post data
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /api/post
router.delete('/post/:id', async (req, res) => {
  try {
    // Delete a post by its `id` value
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If no post found, throw error
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    // respond with the deleted post data
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;