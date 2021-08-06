// Contains all user-facing routes
const router = require("express").Router();
const { Post, User, Comment } = require("../models");

// rendering all posts to homepage
router.get("/", async (req, res) => {
  console.log(req.session);
  console.log('home');

  const post = await Post.findAll({
    attributes: ["id", "post_text", "title", "created_at"],
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
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      // Pass serialized data and session flag into template
      console.log(posts);
      res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET POST renders login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// rendering sign up page
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
