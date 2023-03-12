// import needed modules
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');


// POST /api/users
router.post('/', async (req, res) => {
  try {
    // Create a new user
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    // Set session variables
    req.session.userId = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;
    // Save session variables
    req.session.save();

    // Respond with the new user data
    res.json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  // email and password are sent in the request body
  const { email, password } = req.body;
  try {
    // Find a user with the provided email address
    const userData = await User.findOne({ where: { email } });
    // If no user found, throw error
    if (!userData) {
      return res.status(400).json({ message: 'Incorrect email or password!' });
    }
    // Compare the provided password with the stored password
    const validPassword = await bcrypt.compare(password, userData.password);
    // If the passwords don't match, throw error
    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect email or password!' });
    }
    // Map user data to plain objects
    const uData = userData.get({ plain: true });
    // Delete the password from the user object
    delete uData.password;
    // Set session variables
    req.session.save(() => {
      req.session.userId = uData.id;
      req.session.username = uData.username;
      req.session.loggedIn = true;
      // Respond with the user data
      res.json({ user: uData, message: 'You are now logged in!' });
    });
  } catch (error) {
    console.log('Login Error:', error);
    res.status(500).json({ message: 'An error occurred during login!' });
  }
});

// POST /api/users/logout
router.post('/logout', (req, res) => {
  // If the user is logged in, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;