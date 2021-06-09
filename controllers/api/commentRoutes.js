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


// CREATE NEW COMMENTS
router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        post_id: req.body.post_id,
        comment_text: req.body.comment_text,
        user_id: req.session.user_id
    });
    res.status(200).json(newComment);
} catch (err) {
  res.status(400).json(err);
}
});