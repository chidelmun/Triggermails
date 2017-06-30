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
				res.render('login', {title : 'Trigger Mail | Login', message : " Database not Running..."});
			}else{
				console.log("Connected to Database");
			}
		});

		connection.query(" select display_name from users", function(err, results, fields){
			if (err) {
				console.log("Error with query " + err);
			}else{
				if (results.length > 0) {
					console.log("Query success ");
					console.log(results);
					// req.session.emails = results.length;
					res.render('requests', {title : "Trigger Mail Friends", data : req.session.user, friends : results });
				}else{
					console.log("No Emails ");
					res.render('requests', {title : "Trigger Mail Friends", data : req.session.user, friends : results });
				}
			}
		});
		
		// res.redirect(200,'/');
	}
  
});

module.exports = router;
