const Movie = require('../models/').Movie;
const Category = require('../models/').Category;
const Actor = require('../models/').Actor;
const MovieActor = require('../models/').MovieActor;

/**
 * @api {get} /movies Show all movies
 * @apiName getMovies
 * @apiGroup Movie
 * @apiSuccess {String} id of the Movie.
 * @apiSuccess {String} name of the Movie.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *     
 *         "id": 1,
 *         "name": "Asterix et Obelix: mission cleopatre",
 *         "description": "Film français humoristique basé sur la BD très connue du même nom",
 *         "year": 1990,
 *         "picture": "2wCEAAkGBxMTEhUSEhMWFRUXFxgYGRcXGRsfGBodGyAYHRoaIh4YICogHR0nIBsfITEhJSotLy4uGx8zODMtNygtLisBCgoKDg0OGxAQGjMmICYyLy02LTUtKy8tLy0yLy8vLTUtMC0yLS0tLS41Ly03LTAtLS8tLS8tLS0tLS0tLS0tLf",
 *         "actorId":1,
 *         "MovietypeId": 1,
 *         "createdAt": "2020-02-11T13:57:17.000Z",
 *         "updatedAt": "2020-02-11T13:57:17.000Z"
 *   }]
 */
exports.movie_list = (req,res,next)=>{
    Movie.findAll({
        attributes: ['id','title','description','picture','year','note'], //Choose which fields to show
        include: [
            {
                model: Actor,
                attributes: ['id','name','firstname','birth','picture']
            }   
        ],
        order: [['title', 'ASC']]
    })
    .then(movies => {
        MovieActor.findAll({

        })
        res.json(movies);
    })
    .catch(error=>{
        res.status(400);
        res.json({message : 'movie_list, il y a rien la'});
        console.log(error);
        
    })
}

/*
 * @api {get} /movies/:id Show detail of one movie
 * @apiName getMoviesDetail
 * @apiGroup Movie
 * 
 * @apiParam {Number} id of the Movie
 * 
 * @apiSuccess {String} id of the Movie.
 * @apiSuccess {String} name of the Movie.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     
 *         "id": 1,
 *         "name": "Asterix et Obelix: mission cleopatre",
 *         "description": "Film français humoristique basé sur la BD très connue du même nom",
 *         "year": 1990,
 *         "picture": "2wCEAAkGBxMTEhUSEhMWFRUXFxgYGRcXGRsfGBodGyAYHRoaIh4YICogHR0nIBsfITEhJSotLy4uGx8zODMtNygtLisBCgoKDg0OGxAQGjMmICYyLy02LTUtKy8tLy0yLy8vLTUtMC0yLS0tLS41Ly03LTAtLS8tLS8tLS0tLS0tLS0tLf",
 *         "actorId":1,
 *         "MovietypeId": 1,
 *         "createdAt": "2020-02-11T13:57:17.000Z",
 *         "updatedAt": "2020-02-11T13:57:17.000Z"
 *   }
 */
exports.movie_detail = (req,res,next)=>{
    const id = req.params.id
    Movie.findByPk(id)
    .then(movie => {
        res.json(movie);
    })
    .catch(error=>{
        res.status(400);
        res.json({message : 'movie_detail, il y a rien la'});
    })
}


exports.movie_average = (req,res,next)=>{
    Movie.findAll({
        attributes: [[sequelize.fn('AVG', sequelize.col('note')), 'value']]
    })
    .then(data => res.json(data))
    .catch(error=>{
        res.status(400);
        res.json({message : 'il y a rien la'});
    })
}


exports.movie_list_year = (req,res,next)=>{

    Movie.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'value'],[sequelize.col('year'), 'data']],
        group:['year'],
        raw: true,
    })
    .then(data => res.json(data))
    .catch(error=>{
        res.status(400);
        res.json({message : 'il y a rien la'});
    })
}


exports.movie_list_best = (req,res,next)=>{
    Movie.findAll({
        limit: 20,
        attributes: ['id','title','description','picture','year','note'], //Choose which fields to show
        include: [
            {
                model: Actor,
                attributes: ['id','name','firstname','birth','picture']
            }   
        ],
        order: [['note', 'DESC']]
    })
    .then(movies => {
         res.json(movies);
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 * @api {post} /movies/add Add one movie
 * @apiName addMovie
 * @apiGroup Movie
 * 
 * @apiParam {String} name name of the Movie.
 * @apiParamExample {json} Request-Example:
 
 ** 
 * @apiSuccess {String} id of the Movie.
 * @apiSuccess {String} name of the Movie.
 * @apiSuccess {Date} createdAt date of creation of the Movie.
 * @apiSuccess {Date} updatedAt last update of the Movie.
 * @apiSuccessExample {json} Success-Response:
 *     {
 *         
 *         "id": 1,
 *         "name": "Asterix et Obelix: mission cleopatre",
 *         "description": "Film français humoristique basé sur la BD très connue du même nom",
 *         "year": 1990,
 *         "picture": "2wCEAAkGBxMTEhUSEhMWFRUXFxgYGRcXGRsfGBodGyAYHRoaIh4YICogHR0nIBsfITEhJSotLy4uGx8zODMtNygtLisBCgoKDg0OGxAQGjMmICYyLy02LTUtKy8tLy0yLy8vLTUtMC0yLS0tLS41Ly03LTAtLS8tLS8tLS0tLS0tLS0tLf",
 *         "actorId":1,
 *         "MovietypeId": 1,
 *         "createdAt": "2020-02-11T13:57:17.000Z",
 *         "updatedAt": "2020-02-11T13:57:17.000Z"
 *     }
 */
exports.movie_add = (req,res,next) => {
    Movie.create(req.body)
    .then(movie => {
        res.json(movie);
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 * @api {put} /movies/edit/:id Edit one movie
 * @apiName editMovie
 * @apiGroup Movie
 * 
 * @apiSuccess {String} id of the Movie.
 * @apiSuccess {String} name of the Movie.
 * @apiSuccess {Date} createdAt date of creation of the Movie.
 * @apiSuccess {Date} updatedAt last update of the Movie.
 * @apiSuccessExample {json} Success-Response:
 *     {
 *         "id": 1,
 *         "name": "Asterix et Obelix: mission cleopatre",
 *         "description": "Film français humoristique basé sur la BD très connue du même nom",
 *         "year": 1990,
 *         "picture": "2wCEAAkGBxMTEhUSEhMWFRUXFxgYGRcXGRsfGBodGyAYHRoaIh4YICogHR0nIBsfITEhJSotLy4uGx8zODMtNygtLisBCgoKDg0OGxAQGjMmICYyLy02LTUtKy8tLy0yLy8vLTUtMC0yLS0tLS41Ly03LTAtLS8tLS8tLS0tLS0tLS0tLf",
 *         "actorId":1,
 *         "MovietypeId": 1,
 *         "createdAt": "2020-02-11T13:57:17.000Z",
 *         "updatedAt": "2020-02-11T13:57:17.000Z"
 *     }
 */

exports.movie_edit = (req,res,next) => {
    const id = req.params.id;
    Movie.update(req.body, {
        where: {
          id: id
        }
    })
    .then(movie => {
        res.json(movie);
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 * @api {delete} /movies/delete/:id Delete one movie
 * @apiName deleteMovie
 * @apiGroup Movie
 * 
 * @apiParam {Number} id of the Movie.
 * 
 * @apiSuccess {String} message Movie deleted.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       message: "Movie deleted"
 *     }
 */
exports.movie_delete = (req,res,next) => {
    const id = req.params.id;
    Movie.destroy({
        where: {
          id: id
        }
    })
    .then(movie => {
        res.status(200);
        res.json({message: "Movie deleted"});
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}
/**
 * @api {ActorMovie} /movies/actor/:id Add actor to a movie
 * @apiName addActor
 * @apiGroup Movie
 * 
 * @apiParam {Number} id of the Movie.
 * 
 * @apiSuccess {String} message Movie deleted.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       message: "Movie deleted"
 *     }
 */
exports.movie_add_actor = (req, res, next) => {
    const id = req.params.id;
    const movieActor = {"MovieId":id, "ActorId":req.body.actorId};
    MovieActor.create(movieActor)
    .then(data => {
        res.json({message: "Actor Added"});
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}



