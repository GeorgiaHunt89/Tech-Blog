const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// GET POST renders all posts
router.get("/", async (req, res) => {
  console.log("======================");

  const postData = await Post.findAll({
    attributes: ["id", "post_text", "title", "created_at"],
    // displays posts from most recent
    order: [["created_at", "DESC"]],
    // JOIN to the User table
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((postData) => res.json(postData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE POST
router.post("/", withAuth, async (req, res) => {
  console.log('newPost');
  const newPost = await Post.create({
    title: req.body.title,
    post_text: req.body.post_text,
    user_id: req.session.user_id,
  })
    .then((newPost) => res.json(newPost))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE POST
router.put("/:id", withAuth, async (req, res) => {
  const updatePost = await Post.update(
    {
      title: req.body.title,
      post_text: req.body.post_text,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatePost) => {
      if (!updatePost) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(updatePost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE POST
router.delete("/:id", withAuth, async (req, res) => {
  const deletePost = await Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletePost) => {
      if (!deletePost) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(deletePost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
