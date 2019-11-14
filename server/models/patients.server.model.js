var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var medicationSchema = new Schema({
	name: String,
	dose: String,
	frequency: String
});

var patientSchema = new Schema({
  /* Your code for a schema here */
  //Check out - https://mongoosejs.com/docs/guide.html
  nickname: {type: String, required: true},
  notes: String,
	careManager: Schema.Types.ObjectId,
	medications: [medicationSchema],
  created_at: Date,
  updated_at: Date
});

patientSchema.pre('save', function(next) {
  var currentDate  = new Date();
  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

/* Use your schema to instantiate a Mongoose model */
var Patient = mongoose.model('Patient', patientSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Patient;
