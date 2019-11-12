
/* Dependencies */
var mongoose = require('mongoose'),
    Caregiver = require('../models/caregivers.server.model.js')


/* Create a caregiver */
exports.create = function(req, res) {

    /* Instantiate a Listing */
    var caregiver = new Caregiver(req.body);

    /* Then save the listing */
    caregiver.save(function(err) {
        if(err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(caregiver);
        }
    });
};

/* Show the current listing */
exports.read = function(req, res) {
    /* send back the listing as json from the request */
    res.json(req.caregiver);
};

/* Update a listing - note the order in which this function is called by the router*/
exports.update = function(req, res) {
    var caregiver = req.caregiver;

    /* Replace the listings's properties with the new properties found in req.body */
    if(req.body.username) caregiver.username = req.body.username;
    caregiver.email = req.body.email;

    console.log("Update correctly?: ", req.body.deleteCustom);
    if(req.body.deleteCustom) {
        let foundList = caregiver.customADLs.find((item) => {
            return item.name === req.body.selectedListName;
        })
        let index = caregiver.customADLs.indexOf(foundList);
        if (index > -1) {
            caregiver.customADLs.splice(index, 1);
        }
    }
    else caregiver.customADLs.push(req.body.customADLs[0]);


    /* Save the listing */
    caregiver.save(function(err) {
        if(err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(caregiver);
        }
    });

};

/* Delete a listing */
exports.delete = function(req, res) {
    var caregiver = req.caregiver;
    /* Add your code to remove the listins */
    Caregiver.deleteOne({_id: caregiver._id}, function (err) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.status(200);
            res.json();
        }
    });

};

/* Retreive all the directory caregivers, sorted alphabetically by caregiver name */
exports.list = function(req, res) {
    Caregiver.find({}, function(err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(result);
        }
    });
};

/*
  Middleware: find a caregiver by its ID, then pass it to the next request handler.
  HINT: Find the caregiver using a mongoose query,
        bind it to the request object as the property 'caregiver',
        then finally call next
 */
exports.caregiverByID = function(req, res, next, id) {
    Caregiver.findById(id).exec(function(err, caregiver) {
        if(err) {
            res.status(400).send(err);
        } else {
            req.caregiver = caregiver;
            next();
        }
    });
};