var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (!req.session.user) {
  	res.redirect('/login');
  }else{
  	console.log(req.session.emails);
  	res.render('user', {title : req.session.user.display_name + " | User Profile", data : req.session.user});
  }
});

module.exports = router;
