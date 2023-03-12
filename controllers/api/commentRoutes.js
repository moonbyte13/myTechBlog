// import required modules
const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/comment', async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      commentText: req.body.commentText,
      userId: req.session.userId,
      postId: req.body.postId
    });
    res.json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/comment/:id', async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/comment/:id', async (req, res) => {
  try {
    const dbCommentData = await Comment.update(
      {
        commentText: req.body.commentText
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;