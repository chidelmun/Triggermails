var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (!req.session.user) {
  	res.redirect('/login');
  }else{
  	res.render('user', {title : "Trigger Mail Dashboard", data : req.session.user});
  }
});

module.exports = router;
