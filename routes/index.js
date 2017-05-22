var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (!req.session.user) {
		res.redirect('/login');
	}
	

	req.session.user = {};
	var connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'root',
		database : 'mailapp'
	});

	connection.connect(function(err){
		if (err) {
			console.log("Error : " + err);
		}
	});

	connection.query("SELECT * from users", function(err, results, fields){
		if (err) {
			console.log("Error with Query " + err);
		}else{
			console.log("Query Success  : " + results);
			res.render('index', { title: 'Express', 'unread_messages' : results.length });
		}
	});

  
});

module.exports = router;
