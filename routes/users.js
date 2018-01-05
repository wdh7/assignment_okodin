const express = require('express');
const router = express.Router();
const models = require('../models');
const { User, Profile, Location, sequelize } = models;

router.get('/:id/edit', (req, res) => {
  const userId = parseInt(req.params.id);

  if (userId === req.session.currentUser.id) {
    User.findById(userId, {
      include: [
        {
          model: Profile,
          include: [{model: Location}]
        }
      ]
    })
      .then(user => {
        res.render('users/edit', {user});
      })
      .catch(err => {
        res.status(500).send(err.stack);
      });
  } else {
    res.redirect('/search');
  }
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;

  User.findById(userId, {
    include: [
      {
        model: Profile,
        include: [{model: Location}]
      }
    ]
  })
    .then(user => {
      res.render('users/show', {user});
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});

router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { username, age, city, about, talents, favThings, whyMe} = req.body;
  let locationId;

  sequelize.transaction(t => {
    return User.update({
      username: username
    }, {
      where: {
        id: userId
      },
      transaction: t
    }).then(() => {
      return Profile.findOrCreate({
        default: {age, about, talents, favThings, whyMe},
        where: {id: userId},
        transaction: t
      })
    }).spread(profile => {
      locationId = profile.locationId;

      return Profile.update({
        age,
        about,
        talents,
        favThings,
        whyMe
      }, {
        where: {id: profile.id},
        transaction: t
      })
    })
      .then(() => {
        return Location.update({
          city
        }, {
          where: {id: locationId},
          transaction: t
        })
      })
      .then(() => {
        res.redirect(`/users/${userId}`);
      })
      .catch(err => {
        res.status(500).send(err.stack);
      })
  });
});


module.exports = router;
