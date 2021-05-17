// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const router = require('express').Router()

const Users = require('./users-model.js')

const protectedPath = (req, res, next) => {
  // TODO remove req.session after setting it
  if (req.session && req.session.user) {
    next()
  } else {
    next({
      message: `You shall not pass!`,
    })
  }
}

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */
router.get('/', protectedPath, (req, res, next) => {
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next);
})

// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router;