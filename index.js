var express=require('express');
var app=express();

app.use(express.static(__dirname+'/prod'));

app.get('/',function(req,res){
	res.sendFile(__dirname+'/prod/index.html');
});

app.listen(8081,function(err){
	if(err){
		console.log('Error in starting server: ',err);
	}else{
		console.log('Server started successfully on port: 8081');
	}
});
