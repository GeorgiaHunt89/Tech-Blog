// Contains all user-facing routes
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('./config/connection');

// GET POST renders all posts to homepage
router.get('/', async (req, res) => {
    console.log(req.session);
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['name'],
            },
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POST renders login page
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });

// GET POST renders a single post to a page
router.get('/post/:id', async (req, res) => {

    const postData = await Post.findOne({
        where: { 
            id: req.params.id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['name'],
            },
        },
      ],
    })

    .then(postData => {
        if (!postData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
    // Serialize the data 
    const post = postData.get({ plain: true });

    // Passes the data to the template
    res.render('single-post', {
      ...post,
      logged_in: req.session.logged_in
    })

   .catch (err => {
       console.log(err);
    res.status(500).json(err);
        })
    });
});


module.exports = router;
