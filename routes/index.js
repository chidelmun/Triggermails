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
		var connection = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'root',
			database : 'mailapp'
		});
		connection.connect(function(err){
			if (err) {
				console.log("Error connecting tom database");
			}else{
				console.log("Connected to Database");
			}
		});

		connection.query(" select * from messages where dest = ?", [req.session.user.email], function(err, results, fields){
			if (err) {
				console.log("Error with query " + err);
			}else{
				if (results.length > 0) {
					console.log("Query success ");
					console.log(results);
					req.session.emails = results.length;
					res.render('index', {title : "Trigger Mail Dashboard", data : req.session.user, emails : results });
				}else{
					console.log("No Emails ");
					res.render('index', {title : "Trigger Mail Dashboard", data : req.session.user, emails : results });
				}
			}
		});
		
		// res.redirect(200,'/');
	}
  
});

module.exports = router;
