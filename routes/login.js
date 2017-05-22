var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {

	res.render('login', { title: 'Wakku Login',  message : ''});

  
});

router.post('/', function(req, res,next){


		var username = req.body.user;
		var password = req.body.pass;
		console.log("Username : " + username + " Password : " + password);

		var connection = mysql.createConnection({
			host : "localhost",
			user : "root",
			password : "root",
			database : "mailapp"
		});

		connection.connect(function(err){
			if (err) {
				console.log("Error Connecting to Database");
				res.send("Error Connecting to Database");
			}else{
				console.log("Connected to Database ");
			}
		});

		connection.query("select * from users where email = ?", [username], function(err, results,fields){
			
			console.log(results);
			if (results.length > 0) {
				if (results[0].email == username && results[0].password == password) {
					console.log("User Found in Database");
					req.session.user = results[0];
					res.render('index', {title : 'Trigger Mail | Dashboard', data : req.session.user});
				}else{

					res.render('login', {title : 'Trigger Mail | Login', message : " Enter Correct Password "});
				}

			}else{
				console.log("Username not Found!");
				res.render('login', {title : 'Trigger Mail | Login', message : " No Matching user Found! "});
			}
		});


		
});

module.exports = router;
