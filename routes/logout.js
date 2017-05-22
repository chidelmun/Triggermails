var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
	req.session.destroy(function(err){
		if (err) {
			console.log("Error with logout");
		}else{
			res.redirect('/');
		}
	});
  
});

module.exports = router;
