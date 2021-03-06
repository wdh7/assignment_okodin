const express = require('express');
const router = express.Router();
const models = require('../models');
const { User } = models;

router.get('/', (req, res) => {
  if (req.session.currentUser) {
    const { username, email } = req.session.currentUser;

    User.findOne({
      where: {
        username,
        email
      }
    })
      .then(user => {
        res.redirect(`/users/${user.id}`);
      })
      .catch(err => {
        res.status(500).send(err.stack);
      });
  } else {
    res.redirect('/login');
  }
});

router.get('/login', (req, res) => {
  if (req.session.currentUser) {
    res.redirect('/');
  }

  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, email } = req.body;

  User.find({
    where: {
      username,
      email
    }
  })
    .then(user => {
      if (user) {
        // found user in database
        req.session.currentUser = {
          username: user.username,
          email: user.email,
          id: user.id
        };

        res.redirect(`/users/${user.id}`);
      } else {
        // return null
        res.redirect('/login');
      }
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});

router.get('/logout', (req, res) => {
  req.session = null;

  res.redirect('/');
});


module.exports = router;
