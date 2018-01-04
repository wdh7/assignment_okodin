const express = require('express');
const router = express.Router();
const models = require('../models');
const { User, Profile, Location, sequelize } = models;

router.get('/', (req, res) => {
  const user = req.session.currentUser;

  User.findAll({
    where: {
      id: {
        $not: user.id
      }
    },
    include: [
      {
        model: Profile,
        include: [
          {model: Location}
        ]
      }
    ]
  })
    .then(users => {
      res.render('users/index', {users, user});
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});

router.post('/', (req, res) => {
  const gender = req.body.gender || ['male', 'female'];
  const age = req.body.age || 21;
  const minHeight = req.body.minHeight || 5;
  const maxHeight = req.body.maxHeight || 7;
  const maritalStatus = req.body.maritalStatus || ['single', 'dating', 'married'];

  User.findAll({
    where: {
      id: {
        $not: req.session.currentUser.id
      }
    },
    include: [
      {
        model: Profile,
        where: {
          gender: gender,
          age: {
            $gte: age
          },
          height: {
            $between: [minHeight, maxHeight]
          },
          maritalStatus: maritalStatus
        },
        include: [
          {
            model: Location
          }
        ]
      }
    ]
  })
    .then(users => {
      res.render('users/index', {users});
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});


module.exports = router;
