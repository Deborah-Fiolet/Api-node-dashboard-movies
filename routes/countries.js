const express = require('express');
const router = express.Router();
const country_controller = require('../controller/country.controller');

router.get('/',country_controller.country_list);
router.get('/:id',country_controller.country_detail);
router.post('/',country_controller.country_add);
router.put('/:id',country_controller.country_edit);
router.delete('/:id',country_controller.country_delete);

module.exports = router;