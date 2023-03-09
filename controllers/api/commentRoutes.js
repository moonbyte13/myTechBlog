const router = require('express').Router();
const { User, Comment } = require('../../models');

// GET comments for one post
router.get('/:id', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      attributes: ['username'],
      where: { postId: req.params.id },
      include: [{ model: User }]
    });

    res.render('post', { comments, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/comment
router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;