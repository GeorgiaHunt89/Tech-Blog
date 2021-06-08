const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new user
router.post('/', async (req, res) => {
    try {
      const userData = await User.create({
          username:req.body.username,
          email: req.body.email,
          password: req.body.password
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
 router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
        // excludes password
      const { password, ...userDetails } = user.get({ plain: true });
  
      req.session.save(() => {
        req.session.user = userDetails;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

 // LOG OUT
 router.post('/logout', withAuth, (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

// DELETE USER
router.delete('/:id', withAuth, (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!userData) {
            res
              .status(400)
              .json({ message: 'Incorrect user id, please try again' });
            return;
          }
          res.status(200).json(userDetails);
      
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;
   