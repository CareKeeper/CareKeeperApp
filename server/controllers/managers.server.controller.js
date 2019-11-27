
/* Dependencies */
var mongoose = require('mongoose'),
    Manager = require('../models/managers.server.model.js')


/* Create a manager */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var manager = new Manager(req.body);

  /* Then save the listing */
  manager.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(manager);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.manager);
};

/* Update a listing - note the order in which this function is called by the router*/
exports.update = function(req, res) {
  var manager = req.manager;

  /* Replace the listings's properties with the new properties found in req.body */
	if(req.body.username) manager.username = req.body.username;
  //manager.email = req.body.email;

  console.log("Update correctly?: ", req.body.deleteCustom);
  if(req.body.deleteCustom) {
    let foundList = manager.customADLs.find((item) => {
      return item.name === req.body.selectedListName;
    })
    let index = manager.customADLs.indexOf(foundList);
    if (index > -1) {
      manager.customADLs.splice(index, 1);
    }
  }
  else manager.customADLs.push(req.body.customADLs[0]);


  /* Save the listing */
	manager.save(function(err) {
		if(err) {
			console.log(err);
			res.status(400).send(err);
		} else {
			res.json(manager);
		}
	});

};

/* Delete a listing */
exports.delete = function(req, res) {
  var manager = req.manager;
  /* Add your code to remove the listins */
	Manager.deleteOne({_id: manager._id}, function (err) {
		if (err) {
			console.log(err);
			res.status(400).send(err);
		} else {
			res.status(200);
			res.json();
		}
	});

};

/* Retreive all the directory managers, sorted alphabetically by manager name */
exports.list = function(req, res) {
	Manager.find({}, function(err, result) {
		if (err) {
			console.log(err);
			res.status(400).send(err);
		} else {
			res.json(result);
		}
});
};

/*
  Middleware: find a manager by its ID, then pass it to the next request handler.

  HINT: Find the manager using a mongoose query,
        bind it to the request object as the property 'manager',
        then finally call next
 */
exports.managerByID = function(req, res, next, id) {
  Manager.findById(id).exec(function(err, manager) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.manager = manager;
      next();
    }
  });
};
