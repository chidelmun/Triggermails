var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
	var connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'root',
		database : 'shop'
	});

	connection.connect(function(err){
		if (err) {
			console.log("Error : " + err);
		}
	});

	connection.query("SELECT * from jobs", function(err, results, fields){
		if (err) {
			console.log("Error with Query " + err);
		}else{
			console.log("Query Success  : " + results);
			res.render('index', { title: 'Express', 'unread_messages' : results.length });
		}
	});

  
});

module.exports = router;
