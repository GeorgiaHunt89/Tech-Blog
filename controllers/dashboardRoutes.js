// Routes
const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Dashboard displaying posts by logged in user
// Use withAuth middleware to prevent access to route
router.get("/", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "post_text", "title", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    const posts = postData.get((post) => post.get({ plain: true }));

    res.render("dashboard", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Rendered edit page
// Use withAuth middleware to prevent access to route
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "post_text", "title", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    const posts = postData.get({ plain: true });

    res.render("editPosts", { posts, logged_in: true });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Renders new post page
router.get("./newPost", (req, res) => {
  res.render("newPost");
});

module.exports = router;
