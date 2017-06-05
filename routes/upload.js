var express = require('express');
var fs = require('fs');
const fileUpload = require('express-fileupload');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req,res){
	  if (!req.files)
    return res.status(400).send('No files were uploaded.');
	 
	  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
	  let photo = req.files.photo;
	  var filename = req.files.photo.name;
	  var newname  = req.session.user.display_name.replace(' ', '').toLowerCase() + '.jpg';
	 
	  // Use the mv() method to place the file somewhere on your server 
	  console.log(filename + " or " + newname );

	  photo.mv('public/images/photos/'+filename, function(err){

	  	if (err) {
	  		console.log("Error uploading file");
	  		res.send("File NOT uploaded");
	  	}else{

	  	console.log(newname + "......");
	  
	  	fs.rename('public/images/photos/'+filename, 'public/images/photos/'+newname, function(err){
	  		if (err) {
	  			console.log('Error renaming file..' + filename + ' to ' + newname );
	  		}else{
	  			console.log('File Renamed Successfully');
	  		}
	  	});

	   res.send('File uploaded!');
	   }

 });
});

module.exports = router;
