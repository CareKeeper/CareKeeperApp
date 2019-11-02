var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var managerSchema = new Schema({
  username: {type: String, required: true, unique: true},
	email: String,
  created_at: Date,
  updated_at: Date
});

managerSchema.pre('save', function(next) {
  var currentDate  = new Date();
  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

/* Use your schema to instantiate a Mongoose model */
var Manager = mongoose.model('Manager', managerSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Manager;
