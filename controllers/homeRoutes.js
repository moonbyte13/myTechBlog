const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [{
				model: User,
				attributes: ['username'],
			},],
		});

		const posts = postData.map((post) => post.get({
			plain: true
		}));

		res.render('homepage', {
			posts,
		logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET dashboard
router.get('/dashboard', withAuth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
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

		res.render('dashboard', {
			user,
			logged_in: true
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET postin
router.get('postin', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}

	res.render('postin');
});

// GET sign up
router.get('/signUp', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}
	res.render('signUp');
});

// GET login
router.get('/login', (req, res) => {
	// If the user is already logged in, redirect the request to another route
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}

	res.render('login');
});

module.exports = router;