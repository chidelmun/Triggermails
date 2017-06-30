var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET users listing. */
router.get('/api/v1/data/users', function(req, res, next) {
	if (!req.session.user) {
		res.json({error : "Not Authenticated",code : 404});
	}else{
		var connection = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'root',
			database : 'mailapp'
		});
		connection.connect(function(err){
			if (err) {
				console.log("Error connecting tom database");
				res.json({code : 444, msg : "Could not connect to Mysql Database"});
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
					res.json(results);
					
				}else{
					console.log("No Emails ");
					res.json({code : 403, length : 0, message : "Empty resultset"});
				}
			}
		});
	}
  	
});

module.exports = router;
