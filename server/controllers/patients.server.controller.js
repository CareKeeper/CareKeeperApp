
/* Dependencies */
var mongoose = require('mongoose'),
    Patient = require('../models/patients.server.model.js')


/* Create a patient */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var patient = new Patient(req.body);

  /* Then save the listing */
  patient.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(patient);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.patient);
};

/* Update a listing - note the order in which this function is called by the router*/
exports.update = function(req, res) {
  var patient = req.patient;

  /* Replace the listings's properties with the new properties found in req.body */
	patient.nickname = req.body.nickname;
	patient.careManager = req.body.careManager;
	patient.medications = req.body.medications;


  /* Save the listing */
	patient.save(function(err) {
		if(err) {
			console.log(err);
			res.status(400).send(err);
		} else {
			res.json(patient);
		}
	});

};

/* Delete a listing */
exports.delete = function(req, res) {
  var patient = req.patient;
  /* Add your code to remove the listins */
	Patient.deleteOne({_id: patient._id}, function (err) {
		if (err) {
			console.log(err);
			res.status(400).send(err);
		} else {
			res.status(200);
			res.json();
		}
	});

};

/* Retreive all the directory patients, sorted alphabetically by patient name */
exports.list = function(req, res) {
	Patient.find({}, function(err, result) {
		if (err) {
			console.log(err);
			res.status(400).send(err);
		} else {
			res.json(result);
		}
});
};

/*
  Middleware: find a patient by its ID, then pass it to the next request handler.

  HINT: Find the patient using a mongoose query,
        bind it to the request object as the property 'patient',
        then finally call next
 */
exports.patientByID = function(req, res, next, id) {
  Patient.findById(id).exec(function(err, patient) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.patient = patient;
      next();
    }
  });
};
