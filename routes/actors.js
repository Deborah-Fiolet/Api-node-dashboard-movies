const express = require('express');
const router = express.Router();
const actor_controller = require('../controller/actor.controller');
//const checkAuth = require('../middleware/checkAuth')

router.get('/',actor_controller.actor_list);
router.get('/:id',actor_controller.actor_detail);
router.get('/balance',actor_controller.actor_balance);
router.get('/count',actor_controller.actor_count);
router.post('/',actor_controller.actor_add);
router.put('/:id',actor_controller.actor_edit);
router.delete('/:id',actor_controller.actor_delete);

module.exports = router;