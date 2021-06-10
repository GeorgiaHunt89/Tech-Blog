const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

// CREATE new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // excludes password.
    const { password, ...userDetails } = newUser.get({ plain: true });

    req.session.save(() => {
      req.session.user = userDetails;
      req.session.logged_in = true;

      res.status(200).json(userDetails);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// LOG IN & VERIFY user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await User.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    // excludes password
    const { password, ...userDetails } = User.get({ plain: true });

    req.session.save(() => {
      req.session.user = userDetails;
      req.session.logged_in = true;

      res.json({ user: userDetails, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// LOG OUT
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// UPDATE USER
router.put("/:id", withAuth, async (req, res) => {
  try {
    const userUpdate = await User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    });
    if (!userUpdate) {
      res.status(400).json({ message: "Incorrect user id, please try again" });
      return;
    }
    res.status(200).json(userUpdate);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  try {
    const userDelete = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userDelete) {
      res.status(400).json({ message: "Incorrect user id, please try again" });
      return;
    }
    res.status(200).json(userDelete);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DISPLAY ACCOUNT DATA ON CLIENT SIDE
router.get("/dashboard", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
      attributes: { exclude: ["password"] },
    });
    if (!userData) {
      res.status(400).json({ message: "Error" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
