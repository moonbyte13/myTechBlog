const withAuth = (req, res, next) => {
  if (req.session.user_id = null) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;