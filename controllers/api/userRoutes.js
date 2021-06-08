const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new user
router.post('/', async (req, res) => {
    try {
      const userData = await User.create({
          username:req.body.username,
          email: req.body.email,
          password: req.body.password
      });
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  