const express = require('express');
const router = express.Router();
const models = require('../models');
const { User } = models;

router.get('/:id', (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then(user => {
      res.render('users/show', {user});
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});





module.exports = router;
