const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// LOG IN & VERIFY USER
router.post("/login", async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }

    // VALIDATE USER WITH VALID PASSWORD
    const validPassword = user.validPassword(req.body.password);

    if (!validPassword) {
      res.status(402).json({ message: "No user account found!" });
      return;
    }

    req.session.save(() => {
      // user data stored during session
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

// CREATE A NEW USER
router.post("/", async (req, res) => {
  console.log("new user");
  const user = await User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  })

    // UserData stores user login during session
    .then((dbUserData) => {
      console.log(dbUserData);
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    });
});

// LOGOUT
router.post("/logout", withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// UPDATE THE USER
router.put("/:id", withAuth, async (req, res) => {
  const user = awaitUser
    .update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res
          .status(404)
          .json({ message: "Incorrect user id, please try again" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE THE USER
router.delete("/:id", withAuth, async (req, res) => {
  const user = await User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res
          .status(404)
          .json({ message: "Incorrect user id, please try again" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DISPLAYS ACCOUNT ON CLIENT SIDE
router.get("/dashboard", async (req, res) => {
  const user = await User.findOne({
    where: { email: req.body.email },
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res
          .status(404)
          .json({ message: "Incorrect user id, please try again" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
