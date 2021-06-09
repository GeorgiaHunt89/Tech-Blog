const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// GET POST renders all comments 
router.get('/', async (req, res) => {

    try {
      const allComments = await Comment.findAll({})
      res.status(200).json(allComments);
    } catch (err) {
      res.status(400).json(err);
    }
  });