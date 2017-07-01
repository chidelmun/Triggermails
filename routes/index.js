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
			host : 'sql3.freemysqlhosting.net',
			user : 'sql3182555',
			password : '1CV4Q5vK8D',
			database : ' sql3182555'
		});
		connection.connect(function(err){
			if (err) {
				console.log("Error connecting tom database");
				res.render('login', {title : 'Trigger Mail | Login', message : " Database not Running..."});
			}else{
				console.log("Connected to Database");
			}
		});

		connection.query(" select * from messages left join users on messages.src = users.email where messages.dest = ?", [req.session.user.email], function(err, results, fields){
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
		
		
	}
  
});

module.exports = router;
