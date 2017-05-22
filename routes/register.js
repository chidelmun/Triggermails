var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
	
	
		res.render('register', {title : "Trigger Mail Dashboard" });
	
});

router.post('/', function(req, res, next){
	var connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'root',
		database : 'mailapp'
	});

	connection.connect(function(err){
		if (err) {
			console.log("Error Connecting to Database");
		}else{
			console.log("Connected to Database");
		}
	});

	connection.query("insert into users(email, display_name, password) values(?,?,?)",[req.body.user,req.body.fname + ' ' + req.body.lname, req.body.pass],function(err, results,fields){
		if (err) {
			console.log("Error Executing Query " + err);
		}else{
			res.send("Thank You");
		}
	});

});
module.exports = router;
