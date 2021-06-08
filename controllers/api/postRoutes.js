const router = require('express').Router();
const { Post, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// GET POST renders all posts 
router.get('/', withAuth, async (req, res) => {

  try {
    const postData = await Post.findAll({
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        // Displays posts from most recent
        order:[['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username'],
                }
            }, 
            {
                model: User,
                attributes: ['username']
              },
        ]
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// CREATE POST
router.post('/', withAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    });

    res.status(200).json(newPost);
} catch (err) {
  res.status(400).json(err);
}
});


// UPDATE POST
router.put('/', withAuth, async (req, res) => {
    try {
      const updatePost = await Post.update({
        title: req.body.title,
        post_text: req.body.post_text
      },
      {
        where: {
          id: req.params.id
        },
      });
      if (!updatePost) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(updatePost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
    