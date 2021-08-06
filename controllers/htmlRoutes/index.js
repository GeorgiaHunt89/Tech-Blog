// Requiring path to so we can use relative routes to our HTML files
const express = require("express");
// Requiring our custom middleware for checking if a user is logged in
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("dashboard", {
    user: req.session.user,
    loggedIn: req.session.loggedIn,
  });
});

router.get("/login", (req, res) => {
  // If the user already has an account send them to the dashboard page
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.render("login", {
    user: req.session.user,
    loggedIn: req.session.loggedIn,
  });
});

// Route for logging user out
router.get("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204);
      res.redirect("/");
    });
  } else {
    res.status(404).end();
  }
});

router.get("/signup", (req, res) => {
  // If the user already has an account send them to the dashboard page
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.render("signup", {
    user: req.session.user,
    loggedIn: req.session.loggedIn,
  });
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/dashboard", withAuth, async (req, res) => {
  const postsData = await Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
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
  });
  const posts = postsData.map((post) => post.get({ plain: true }));
  console.log(req.session.user);
  res.render("dashboard", {
    user: req.session.user,
    loggedIn: req.session.loggedIn,
    posts,
  });
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/post/:id", async (req, res) => {
  const postData = await Post.findByPk({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "post_text", "title", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  });
  const post = postData.get({ plain: true });
  console.log(req.session.user);
  res.render("post", {
    post,
    user: req.session.user,
    loggedIn: req.session.loggedIn,
  });
});

// Renders new post page
router.get("/newPost", (req, res) => {
  res.render("newPost", {
    user: req.session.user,
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
