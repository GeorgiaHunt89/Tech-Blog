const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', user-routes);
router.use('/posts', post-routes);
router.use('/comments', comment-routes);

module.exports = router;