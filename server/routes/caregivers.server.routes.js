var caregivers = require('../controllers/caregivers.server.controller.js'),
    express = require('express'),
    router = express.Router();


router.route('/')
    .get(caregivers.list)
    .post(caregivers.create);

router.route('/:caregiverId')
    .get(caregivers.read)
    .put(caregivers.update)
    .delete(caregivers.delete);


router.param('caregiverId', caregivers.caregiverByID);

module.exports = router;