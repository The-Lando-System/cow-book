var express = require('express');

module.exports = function(app) {

	// Application Routes ======================
	app.get('/', function(req,res){
		res.sendfile('./public/views/index.html');
	});
	app.get('/login', function(req,res){
		res.sendfile('./public/views/login.html');
	});
	app.get('/home', function(req,res){
		res.sendfile('./public/views/home.html');
	});
};