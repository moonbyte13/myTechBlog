const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');


// POST /api/users
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    req.session.userId = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;
    req.session.save();

    res.json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// NOTE: This is how I should be doing all my response.json() calls
// POST /api/users/login

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await User.findOne({ where: { email } });
    if (!userData) {
      return res.status(400).json({ message: 'Incorrect email or password!' });
    }
    const validPassword = await bcrypt.compare(password, userData.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect email or password!' });
    }
    const uData = userData.toJSON();
    delete uData.password;
    req.session.save(() => {
      req.session.userId = uData.id;
      req.session.username = uData.username;
      req.session.loggedIn = true;
      res.json({ user: uData, message: 'You are now logged in!' });
    });
  } catch (error) {
    console.log('Login Error:', error);
    res.status(500).json({ message: 'An error occurred during login!' });
  }
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