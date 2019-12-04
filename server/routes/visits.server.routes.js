/* Dependencies */
var visits = require('../controllers/visits.server.controller.js'),
    express = require('express'),
    router = express.Router();



router.route('/byCaregiver/:caregiverID')
    .get(visits.byCaregiver);

router.route('/byPatient/:patientID')
    .get(visits.byPatient);

router.route('/byManager/:managerID')
    .get(visits.byManager);

router.route('/')
    .get(visits.list)
    .post(visits.create);

router.route('/:visitId')
    .get(visits.read)
    .put(visits.update)
    .delete(visits.delete);


router.param('visitId', visits.visitByID);

module.exports = router;