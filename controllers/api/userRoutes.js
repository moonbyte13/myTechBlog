const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
  try {
    // Access our User model and run .findAll() method)
    const dbUserData = await User.findAll({
      attributes: { exclude: ['password'] }
    });

    res.json(dbUserData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one user
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [{ // include the Post model here:
      model: Post,
      attributes: ['id', 'title', 'post_url', 'created_at'],
      include:[{ // include the Comment model here:
        model: Comment,
        attributes: ['id', 'commentText', 'created_at'],
      }]
    }]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
  // expects {username: 'lernantino', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.userId = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    });
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: 'No user with that email!' });
  }

  // Verify user
  const validPassword = user.checkPassword(password);

  if (!validPassword) {
    return res.status(400).json({ message: 'Incorrect password!' });
  }

  req.session.save(() => {
    // declare session variables
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.loggedIn = true;

    res.json({ user, message: 'You are now logged in!' });
  });
});

// POST /api/users/logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;