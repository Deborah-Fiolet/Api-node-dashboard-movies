const Actor = require('../models/').Actor;
const Gender = require('../models/').Gender;
const Movie = require('../models/').Movie;
const Country = require('../models/').Country;


/**
 * @api {get} /actors Show all actors
 * @apiName getActors
 * @apiGroup Actor
 * @apiSuccess {String} _id id of the Actor.
 * @apiSuccess {String} name name of the Actor.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *     
 *         "id": 1,
 *         "name": "Christian Clavier",
 *         "createdAt": "2020-02-11T13:57:17.000Z",
 *         "updatedAt": "2020-02-11T13:57:17.000Z"
 *   }]
 */
exports.actor_list = (req,res,next)=>{
    Actor.findAll({})
    Actor.findAll({
        attributes: ['id','name','firstname','birth','picture'], //Choose which fields to show
        include : [ //Show the association
            { model: Gender, attributes: ['id','name']},
            { model: Country, attributes: ['id','name'] },
            {
                model: Movie,
                attributes: ['title','description','picture','year','note']
            }   
        ],
        order: [['name', 'ASC']]
    })
    .then(actors => {
        res.json(actors);
    })
    .catch(error=>{
        res.status(400);
        res.json({message : error.e + 'actor_list, il y a rien la'});
        console.log(error);
        
    })
}

/*
 * @api {get} /actors/:id Show detail of one actor
 * @apiName getActorsDetail
 * @apiGroup Actor
 * 
 * @apiParam {Number} id of the Actor
 * 
 * @apiSuccess {String} _id id of the Actor.
 * @apiSuccess {String} name name of the Actor.
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
 *         "ActortypeId": 1,
 *         "createdAt": "2020-02-11T13:57:17.000Z",
 *         "updatedAt": "2020-02-11T13:57:17.000Z"
 *   }
 */
exports.actor_detail = (req,res,next)=>{
    const id = req.params.id
    Actor.findByPk(id)
    .then(actor => {
        res.json(actor);
    })
    .catch(error=>{
        res.status(400);
        res.json({message : 'actor_detail, il y a rien la'});
    })
}

exports.actor_balance= (req,res,next)=>{

    Actor.findAll({
        attributes: [[sequelize.fn('count', sequelize.col('genderId')), 'value'],[sequelize.col('Gender.name'), 'data']],
        include : [ 
            { 
                model: Gender,
                attributes: ['name'],
            },
        ],
        group:['genderId'],
        raw: true,
    })
    .then(data => res.json(data))
    .catch(error=>{
        res.status(400);
        res.json({message : 'il y a rien la'});
    })
}

exports.actor_count= (req,res,next)=>{
    MovieActor.findAll({
        attributes: [[sequelize.fn('count', sequelize.col('movieId')), 'value']],
        include : [ 
            { 
                model: Actor,
                include : [
                    {
                        model: Gender,
                    }
                ]
            },
        ],
        order: [[sequelize.literal('value'), 'DESC']],
        group:['actorId'],
    })
    .then(data => res.json(data))
    .catch(error=>{
        res.status(400);
        res.json({message : 'il y a rien la'});
    })
}

/**
 * @api {post} /actors/add Add one actor
 * @apiName addActor
 * @apiGroup Actor
 * 
 * @apiParam {String} name name of the Actor.
 * @apiParam {Float} degree degree of the Actor.
 * @apiParam {String} description description of the Actor.
 * @apiParam {String} picture picture of the Actor.
 * @apiParam {Integer} year year of creation of the Actor.
 * @apiParam {Integer} BreweryId BreweryId of the Actor.
 * @apiParam {Integer} TypeId TypeId of the Actor.
 * @apiParamExample {json} Request-Example:
 *    {
 *     
 *         "id": 1,
 *         "name": "Asterix et Obelix: mission cleopatre",
 *         "description": "Film français humoristique basé sur la BD très connue du même nom",
 *         "year": 1990,
 *         "picture": "2wCEAAkGBxMTEhUSEhMWFRUXFxgYGRcXGRsfGBodGyAYHRoaIh4YICogHR0nIBsfITEhJSotLy4uGx8zODMtNygtLisBCgoKDg0OGxAQGjMmICYyLy02LTUtKy8tLy0yLy8vLTUtMC0yLS0tLS41Ly03LTAtLS8tLS8tLS0tLS0tLS0tLf",
 *         "actorId":1,
 *         "ActortypeId": 1,
 *         "createdAt": "2020-02-11T13:57:17.000Z",
 *         "updatedAt": "2020-02-11T13:57:17.000Z"
 *   }
 ** 
 * @apiSuccess {String} id id of the Actor.
 * @apiSuccess {String} name name of the Actor.
 * @apiSuccess {Float} degree degree of the Actor.
 * @apiSuccess {String} description description of the Actor.
 * @apiSuccess {String} picture picture of the Actor.
 * @apiSuccess {Integer} year year of the Actor.
 * @apiSuccess {Integer} TypeId TypeId of the Actor.
 * @apiSuccess {Integer} BreweryId BreweryId of the Actor.
 * @apiSuccess {Date} createdAt date of creation of the Actor.
 * @apiSuccess {Date} updatedAt last update of the Actor.
 * @apiSuccessExample {json} Success-Response:
 *     {
 *         
 *         "id": 1,
 *         "name": "Asterix et Obelix: mission cleopatre",
 *         "description": "Film français humoristique basé sur la BD très connue du même nom",
 *         "year": 1990,
 *         "picture": "2wCEAAkGBxMTEhUSEhMWFRUXFxgYGRcXGRsfGBodGyAYHRoaIh4YICogHR0nIBsfITEhJSotLy4uGx8zODMtNygtLisBCgoKDg0OGxAQGjMmICYyLy02LTUtKy8tLy0yLy8vLTUtMC0yLS0tLS41Ly03LTAtLS8tLS8tLS0tLS0tLS0tLf",
 *         "actorId":1,
 *         "ActortypeId": 1,
 *         "createdAt": "2020-02-11T13:57:17.000Z",
 *         "updatedAt": "2020-02-11T13:57:17.000Z"
 *     }
 */
/* exports.actor_add = (req,res,next) => {
    Actor.create(req.body)
    .then(actor => {
        res.json(actor);
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
} */

exports.actor_add =  (req,res,next) => {
    if (req.file) {
        console.log('Uploading file...');
        var filename = 'uploads/actors/'+req.file.filename;
    } else {
        console.log('No File Uploaded');
        var filename = '';
    }
    Actor.create({
        id: uuidv4(),
        name: req.body.name,
        firstname: req.body.firstname,
        birth: req.body.birth,
        CountryId: req.body.CountryId,
        GenderId: req.body.GenderId
    })
    .then(actor => {
        const id = actor.id;
        Actor.update({"picture":filename}, {
            where: {
              id: id
            }
        })
        .then(data => {
            res.json(actor);
        })
        .catch(error=>{
            res.status(400);
            res.json(error);
        })
    })  
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 * @api {put} /actors/edit/:id Edit one actor
 * @apiName editActor
 * @apiGroup Actor
 * 
 * @apiSuccess {String} id id of the Actor.
 * @apiSuccess {String} name name of the Actor.
 * @apiSuccess {Float} degree degree of the Actor.
 * @apiSuccess {String} description description of the Actor.
 * @apiSuccess {String} picture picture of the Actor.
 * @apiSuccess {Integer} year year of the Actor.
 * @apiSuccess {Integer} TypeId TypeId of the Actor.
 * @apiSuccess {Integer} BreweryId BreweryId of the Actor.
 * @apiSuccess {Date} createdAt date of creation of the Actor.
 * @apiSuccess {Date} updatedAt last update of the Actor.
 * @apiSuccessExample {json} Success-Response:
 *     {
 *         "id": 1,
 *         "name": "Asterix et Obelix: mission cleopatre",
 *         "description": "Film français humoristique basé sur la BD très connue du même nom",
 *         "year": 1990,
 *         "picture": "2wCEAAkGBxMTEhUSEhMWFRUXFxgYGRcXGRsfGBodGyAYHRoaIh4YICogHR0nIBsfITEhJSotLy4uGx8zODMtNygtLisBCgoKDg0OGxAQGjMmICYyLy02LTUtKy8tLy0yLy8vLTUtMC0yLS0tLS41Ly03LTAtLS8tLS8tLS0tLS0tLS0tLf",
 *         "actorId":1,
 *         "ActortypeId": 1,
 *         "createdAt": "2020-02-11T13:57:17.000Z",
 *         "updatedAt": "2020-02-11T13:57:17.000Z"
 *     }
 */

exports.actor_edit = (req,res,next) => {
    const id = req.params.id;
    Actor.update(req.body, {
        where: {
          id: id
        }
    })
    .then(actor => {
        res.json(actor);
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 * @api {delete} /actors/delete/:id Delete one actor
 * @apiName deleteActor
 * @apiGroup Actor
 * 
 * @apiParam {Number} id id of the Actor.
 * 
 * @apiSuccess {String} message Actor deleted.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       message: "Actor deleted"
 *     }
 */
exports.actor_delete = (req,res,next) => {
    const id = req.params.id;
    Actor.destroy({
        where: {
          id: id
        }
    })
    .then(actor => {
        res.status(200);
        res.json({message: "Actor deleted"});
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}


