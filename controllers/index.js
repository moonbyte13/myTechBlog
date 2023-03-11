const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

router.use('*', (req, res) => {
  res.status(404).render('error', { title: '404 Error', layout: 'errorLayout' });
});

module.exports = router;