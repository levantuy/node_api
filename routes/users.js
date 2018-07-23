var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.post('/register', function (req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  // create a token
  var token = jwt.sign({ id: req.body.username }, 'key_security', {
    expiresIn: 86400 // expires in 24 hours
  });
  var currentTime = new Date();
  res.status(200).send({ auth: true, Token: token, Expiration: Date(currentTime.setTime( currentTime.getTime() + 1 * 86400000 )) });

});

module.exports = router;
