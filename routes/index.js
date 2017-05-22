var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Appointment=require('../models/appointment');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){

Appointment.find({doctor_id:req.user._id}, function(err, data){
        //console.log(">>>> " + data );
		res.render('index',{'appointments':data});
    });


	//res.render('index');
});

router.get('/bookappointment/:id', ensureAuthenticated, function(req, res){
	var doctor_id =  req.param('id');;
	var user_id = req.user._id;
	var user_name=req.user.name;
	var status=0;
var newUser = new Appointment({
			doctor_id: doctor_id,
			user_name:user_name,
			user_id:user_id,
			status:status,
			
		});

		Appointment.createAppointment(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'Your appointment booked successfully');

		res.redirect('/doctors');
        //res.send(doctor_id);
});

router.get('/confirm/:id', ensureAuthenticated, function(req, res){
	var doctor_id =  req.param('id');;
	var query = {'doctor_id':doctor_id};



	Appointment.update(query, {status:1}, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    
		req.flash('success_msg', 'Your appointment booked successfully');

		res.redirect('/');
});

        //res.send(doctor_id);
});

router.get('/doctors', ensureAuthenticated, function(req, res){
	
User.find({member_type:1}, function(err, data){
        //console.log(">>>> " + data );
		res.render('doctors',{'list':data});
    });

	
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;