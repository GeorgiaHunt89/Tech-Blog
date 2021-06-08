// Routes
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('./config/connection');

// Dashboard displaying posts by logged in user
// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const postData = await Post.findByPk(req.session.user_id, {
        attributes: [
          'id',
          'post_text',
          'title',
          'created_at',
        ],
        include: [
          {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username']
        },
        { exclude: ['password'] }
      ],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('dashboard', { post, logged_in: true });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Rendered edit page  
// Use withAuth middleware to prevent access to route
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const postData = await Post.findByPk(req.session.user_id, {
      attributes: [
        'id',
        'post_text',
        'title',
        'created_at',
      ],
      include: [
        {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username']
      },
      { exclude: ['password'] }
    ],
    });

    const post = postData.get({ plain: true });

    res.render('edit-posts', { post, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Renders new post page
router.get('./newpost', (req, res) => {
  res.render('new-posts');
});

module.exports = router;