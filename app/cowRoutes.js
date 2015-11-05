var express = require('express');

var Cow = require('./models/cow');

var cowRoutes = express.Router();

module.exports = function(app) {

	// User To-Do lists ===========================
	cowRoutes.get('/', function(req,res){
		Cow.find(function(err,cows){
			if (err) { res.send(err) };
			res.json(cows);
		});
	});
	cowRoutes.post('/', function(req,res){
		Cow.create({ 
			name:     	req.body.name,
			gender: 	req.body.gender,
			birthdate:  req.body.birthdate
		}, function(err,cow){
			if (err) { res.send(err) };
			res.json({ message: 'Cow successfully logged!' });
		});
	});
	cowRoutes.delete('/:cow_id', function(req,res){
		List.remove({
			_id: req.params.cow_id
		}, function(err,cow){
			if (err) { res.send(err) };
			res.json({ message: 'Cow successfully deleted!' });
		});
	});
	cowRoutes.put('/:cow_id', function(req,res){
		Cow.findById(req.params.cow_id, function(err,cow){
			if (err) { res.send(err) };
			cow.name   	  = req.body.name      || cow.name;
			cow.gender    = req.body.gender    || cow.gender;
			cow.birthdate = req.body.birthdate || cow.birthdate;
			cow.save(function(err){
				if (err) { res.send(err) };
				res.json({ message: 'Cow was successfully updated!' });
			});
		});
	});

	app.use('/cows',cowRoutes);

};