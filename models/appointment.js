var mongoose = require('mongoose');


// appointment Schema

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var AppointmentSchema = mongoose.Schema({
	user_name:{
type:String
    },
	user_id: {
		type: ObjectId
	},
	doctor_id: {
		type: ObjectId
	},
	appointment_time:{
     type:String
	},
	appointment_date:{
      type:Date
	},
	
	status:{
        type:Number
    }
});

var Appointment = module.exports = mongoose.model('Appointment', AppointmentSchema);

module.exports.createAppointment = function(newUser, callback){
	
	    
	        newUser.save(callback);
	
	
}