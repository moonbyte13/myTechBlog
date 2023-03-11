const withAuth = (req, res, next) => {
  if (req.session.userId == null) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;