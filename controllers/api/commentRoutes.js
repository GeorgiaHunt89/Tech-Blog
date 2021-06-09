const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// GET POST renders all comments 
router.get('/', async (req, res) => {

    try {
      const allComment = await Comment.findAll({})
      res.status(200).json(allComment);
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


// UPDATE COMMENTS
router.put('/', withAuth, async (req, res) => {
    try {
      const updateComment = await Comment.create({
        post_id: req.body.post_id,
        comment_text: req.body.comment_text,
      },
      {
          where: {
            id: req.params.id
          },
    });
    if (!updateComment) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(updateComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// DELETE COMMENT
router.delete('/:id', withAuth, (req, res) => {
    try {
        const deleteComment = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (!deleteComment) {
            res
              .status(400)
              .json({ message: 'Incorrect id, please try again' });
            return;
          }
          res.status(200).json(deleteComment);
      
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  
  module.exports = router;

