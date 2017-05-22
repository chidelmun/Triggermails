var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
	
	
		res.render('register', {title : "Trigger Mail Dashboard" });
	
});

module.exports = router;
