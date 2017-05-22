var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {

	res.render('login', { title: 'Wakku Login'});

  
});

router.post('/', function(req, res,next){
		// res.render('home', {title : 'Welcome'});
		res.redirect('/home');
});

module.exports = router;
