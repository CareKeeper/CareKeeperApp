var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var customADLsSchema = new Schema({
    name: String,
    order: [Number]
});

var ADLresultsSchema = new Schema({
    name: String,
    order: [String]
});

var visitSchema = new Schema({
    scheduledStart: {type: Date, required: true},
    scheduledFinish: {type: Date, required: true},
    actualStart: {type: Date},
    actualFinish: {type: Date},
    patient: {type: Schema.Types.ObjectId, required: true},
    caregiver: {type: Schema.Types.ObjectId, required: true},
    ADLlist: {type: customADLsSchema, required: true},
    ADLresults: {type: ADLresultsSchema},
    Notes: String,
    created_at: Date,
    updated_at: Date
});

visitSchema.pre('save', function(next) {
    var currentDate  = new Date();
    this.updated_at = currentDate;

    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

/* Use your schema to instantiate a Mongoose model */
var Visit = mongoose.model('Visit', visitSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Visit;