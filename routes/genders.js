const express = require('express');
const router = express.Router();
const gender_controller = require('../controller/gender.controller');

router.get('/',gender_controller.gender_list);
router.get('/:id',gender_controller.gender_detail);
router.post('/',gender_controller.gender_add);
router.put('/:id',gender_controller.gender_edit);
router.delete('/:id',gender_controller.gender_delete);

module.exports = router;