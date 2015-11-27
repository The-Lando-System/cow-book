var jwt = require('jsonwebtoken');
var express = require('express');

var User = require('./models/user');

var userApiRoutes = express.Router();

module.exports = function(app) {

	// User Authentication
	app.post('/authenticate', function(req,res){
		User.findOne({
			username: req.body.username		
		}, function(err,user){
			if (err) throw err;
			if (!user) {
				res.json({ success: false, message: 'Authentication failed, user not found!' });
			} else if (user) {
				if (user.password != req.body.password) {
					res.json({ success: false, message: 'Authentication failed, wrong password!' });
				} else {
					var token = jwt.sign(user, app.get('superSecret'), {
						expiresInMinutes: 1440 
					});
					res.json({
						success: true,
						message: 'Enjoy your token!',
						token: token
					});
				}
			}
		});
	});

	// User specific To-Do API routes ===========================
	userApiRoutes.use(function(req,res,next){
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		if (token) {
			jwt.verify(token, app.get('superSecret'), function(err,decoded){
				if (err) {
					return res.json({ success: false, message: 'Failed to authenticate token!'});
				} else {
					if (decoded.role === 'admin'){
						req.decoded = decoded;
						next();
					}
				}
			});
		} else {
			return res.status(403).send({
				success: false,
				message: 'No token provided!'
			});
		}
	});

	// Routes for the users API, only exposed to admin users ======================
	userApiRoutes.get('/', function(req,res){
		User.find({}, function(err,users){
			if (err) { res.send(err) };
			res.json(users);
		});
	});
	userApiRoutes.post('/', function(req,res){
		User.create({
			firstName: req.body.firstName,
			lastName:  req.body.lastName,
			email:     req.body.email,
			username:  req.body.username,
			password:  req.body.password,
			role:      req.body.role 
		}, function(err,user){
			if (err) { res.send(err) };
			res.json({ message: 'User successfully created!' });
		});
	});
	userApiRoutes.delete('/:id', function(req,res){
		User.remove({ _id: req.params.id }, function(err,user){
			if (err) { res.send(err) };
			res.json({ message: 'Successfully removed user with id ' + req.params.id });
		});
	});
	userApiRoutes.put('/:id', function(req,res){
		User.findById(req.params.id, function(err,user){
			if (err) { res.send(err) };
			user.firstName = req.body.firstName || user.firstName;
			user.lastName  = req.body.lastName  || user.lastName;
			user.email     = req.body.email     || user.email;
			user.username  = req.body.username  || user.username;
			user.password  = req.body.password  || user.password;
			user.role      = req.body.role      || user.role;
			user.save(function(err){
				if (err) { res.send(err) };
				res.json({ message: 'User with ID ' + req.params.id + ' was successfully updated!' });
			});
		});
	});

	app.use('/users',userApiRoutes);

};