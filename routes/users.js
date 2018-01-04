const express = require('express');
const router = express.Router();
const models = require('../models');
const { User, Profile, Location } = models;

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


module.exports = router;
