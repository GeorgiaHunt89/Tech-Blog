const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// GET POST renders all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({});
    if (!dbCommentData) {
      res.status(404).json({ message: "No comments found" });
      return;
    }
    res.status(200).json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE NEW COMMENTS
router.post("/add", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      post_id: req.body.post_id,
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
    });
    res.json(commentData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// DELETE COMMENT
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: { id: req.params.id },
    });
    res.json(commentData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
