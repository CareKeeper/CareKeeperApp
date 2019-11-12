var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var customADLsSchema = new Schema({
    name: String,
    order: [Number]
});

var caregiverSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: String,
    patients: [Schema.Types.ObjectId],
    created_at: Date,
    updated_at: Date
});

caregiverSchema.pre('save', function(next) {
    var currentDate  = new Date();
    this.updated_at = currentDate;

    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

/* Use your schema to instantiate a Mongoose model */
var Caregiver = mongoose.model('Caregiver', caregiverSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Caregiver;