var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (!req.session.user) {
		res.redirect('/login');
	}
	else{
		res.render('new', {title : "Trigger Mail Dashboard", data : req.session.user});
		// res.redirect(200,'/');
	}
  
});

module.exports = router;
