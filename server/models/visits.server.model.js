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
    scheduledStart: {type: Date}, //Original - Need to figure out how to make this work
    scheduledFinish: {type: Date},

    //Visit Creation by Care Manager
    scheduledDate: {type:String, required: true}, //Temporary workable
    scheduledStartTime: {type: String, required: true},
    scheduledFinishTime: {type:String, required: true},
    patient: {type: Schema.Types.ObjectId, required: true},
    caregiver: {type: Schema.Types.ObjectId, required: true},
    ADLlist: {type: customADLsSchema, required: true},
    managerNotes: String,

    //Live Updates from Caregiver
    actualStart: {type: Date},
    actualFinish: {type: Date},
    ADLresults: {type: ADLresultsSchema},
    caregiverNotes: String,

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