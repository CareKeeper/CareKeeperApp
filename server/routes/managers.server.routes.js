
var managers = require('../controllers/managers.server.controller.js'),
    express = require('express'),
    router = express.Router();


router.route('/')
  .get(managers.list)
  .post(managers.create);

router.route('/:managerId')
  .get(managers.read)
  .put(managers.update)
  .delete(managers.delete);


router.param('managerId', managers.managerByID);

module.exports = router;
