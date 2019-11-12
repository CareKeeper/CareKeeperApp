/* Dependencies */
var patients = require('../controllers/patients.server.controller.js'),
    express = require('express'),
    router = express.Router();



router.route('/byManager/:managerID')
	.get(patients.byManager);

router.route('/')
  .get(patients.list)
  .post(patients.create);

router.route('/:patientId')
  .get(patients.read)
  .put(patients.update)
  .delete(patients.delete);


router.param('patientId', patients.patientByID);

module.exports = router;
