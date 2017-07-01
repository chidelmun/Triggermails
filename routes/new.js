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
			host : 'sql3.freemysqlhosting.net',
			user : 'sql3182555',
			password : '1CV4Q5vK8D',
			database : ' sql3182555'
		});

	connection.connect(function(err){
		if (err) {
			console.log("Error Connecting to Database");
		}else{
			console.log("Connected...");
		}
	});
	var emails = req.body.to;
	var email_list = emails.split(',');
	for(var i = 0 ; i< email_list.length ; i++){
		connection.query("insert into messages(src, dest, subject, body) values(?,?,?,?)",[req.body.from, email_list[iw],req.body.subject,req.body.msg], function(err, results, fields){
		if (err) {
			console.log("Error Executing Query " + err);
		}else{
			console.log("Query successful ");
			res.redirect('/');
		}
	});
	}
		
	
});

module.exports = router;
