const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// GET POST renders all comments
router.get("/", async (req, res) => {
  const comment = await Comment.findAll({})
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE NEW COMMENTS
router.post("/", withAuth, async (req, res) => {
  const comment = await Comment.create({
    post_id: req.body.post_id,
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE COMMENTS
router.put("/", withAuth, async (req, res) => {
  const comment = await Comment.create(
    {
      post_id: req.body.post_id,
      comment_text: req.body.comment_text,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE COMMENT
router.delete("/:id", withAuth, async (req, res) => {
  const comment = await Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
