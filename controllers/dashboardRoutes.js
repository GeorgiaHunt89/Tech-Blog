// Routes
const router = require("express").Router();
const { post, user, comment } = require("../models");
const withAuth = require("../utils/auth");

// Dashboard displaying posts by logged in user
// Use withAuth middleware to prevent access to route
router.get("/", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const postData = await post.findByPk(req.session.user_id, {
      attributes: ["id", "post_text", "title", "created_at"],
      include: [
        {
          model: comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: user,
            attributes: ["username"],
          },
        },
      ],
    });

    const displayPost = postData.get({ plain: true });

    res.render("dashboard", { displayPost, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Rendered edit page
// Use withAuth middleware to prevent access to route
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const postData = await post.findByPk(req.session.user_id, {
      attributes: ["id", "post_text", "title", "created_at"],
      include: [
        {
          model: comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: user,
            attributes: ["username"],
          },
        },
      ],
    });

    const editPost = postData.get({ plain: true });

    res.render("editPosts", { editPost, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Renders new post page
router.get("./newPost", (req, res) => {
  res.render("newPost");
});

module.exports = router;
