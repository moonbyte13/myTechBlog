const router = require('express').Router();
const { User, Comment } = require('../../models');

// GET comments for one post
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render('post', {
      comments,
      logged_in: req.session.logged_in,
    });
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
