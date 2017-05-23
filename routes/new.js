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

router.post('/', function(req,res,next){
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
			console.log("Connected...");
		}
	});

	connection.query("insert into messages(src, dest, subject, body) values(?,?,?,?)",[req.body.from, req.body.to,req.body.subject,req.body.msg], function(err, results, fields){
		if (err) {
			console.log("Error Executing Query " + err);
		}else{
			console.log("Query successful ");
			res.send("Sent to :" + req.session.user.email + "Thank You!");
		}
	});	
	
});

module.exports = router;
