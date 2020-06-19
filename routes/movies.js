const express = require('express');
const router = express.Router();
const movie_controller = require('../controller/movie.controller');
//const checkAuth = require('../middleware/checkAuth')

router.get('/',movie_controller.movie_list);
router.get('/:id',movie_controller.movie_detail);
router.get('/average',movie_controller.movie_average);
router.get('/best',movie_controller.movie_list_best);
router.post('/',movie_controller.movie_add);
router.post('/actor/:id', movie_controller.movie_add_actor);
router.put('/:id',movie_controller.movie_edit);
router.delete('/:id',movie_controller.movie_delete);

module.exports = router;
