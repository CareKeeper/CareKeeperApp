
/* Dependencies */
var mongoose = require('mongoose'),
    Visit = require('../models/visits.server.model.js'),
    Patient = require('../models/patients.server.model.js');


/* Create a visit */
exports.create = function(req, res) {

    var visit = new Visit(req.body);

    visit.save(function(err) {
        if(err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(visit);
        }
    });
};

exports.read = function(req, res) {
    res.json(req.visit);
};

exports.update = function(req, res) {
    var visit = req.visit;

    visit.scheduledStart = req.body.scheduledStart;
    visit.scheduledFinish = req.body.scheduledFinish;
    visit.caregiver = req.body.caregiver;
    visit.ADLlist = req.body.ADLlist;
    visit.ADLlist.result = req.body.ADLlist.result;
    console.log(req.body.ADLlist);
    console.log(visit.ADLlist);

    visit.save(function(err) {
        if(err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(visit);
        }
    });

};

exports.delete = function(req, res) {
    var visit = req.visit;
    /* Add your code to remove the listins */
    Visit.deleteOne({_id: visit._id}, function (err) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.status(200);
            res.json();
        }
    });

};

/* Retreive all the directory visits, sorted alphabetically by visit name */
exports.list = function(req, res) {
    Visit.find({}, function(err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(result);
        }
    });
};

exports.byManager = function(req, res) {
    const managerID = req.params.managerID;

    Visit.find({careManager: managerID}, function(err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(result);
        }
    });
};

exports.byPatient = function(req, res) {
    const patientID = req.params.patientID;

    Visit.find({patient: patientID}, function(err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(result);
        }
    });
};

exports.byCaregiver = function(req, res) {
    const caregiverID = req.params.caregiverID;

    Visit.find({caregiver: caregiverID}, function(err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(result);
        }
    });
};

/*
  Middleware: find a visit by its ID, then pass it to the next request handler.
  HINT: Find the visit using a mongoose query,
        bind it to the request object as the property 'visit',
        then finally call next
 */
exports.visitByID = function(req, res, next, id) {
    Visit.findById(id).exec(function(err, visit) {
        if(err) {
            res.status(400).send(err);
        } else {
            req.visit = visit;
            next();
        }
    });
};