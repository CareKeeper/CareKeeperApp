var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var customADLsSchema = new Schema({
      name: String,
      order: [Number]
    });

var managerSchema = new Schema({
  username: {type: String, required: true, unique: true},
  email: String,
  customADLs: { type: [customADLsSchema],
                default: [{
                  name: 'Empty List',
                  order: []
                },{
                  name: 'All',
                  order: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
                }]
              },
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
