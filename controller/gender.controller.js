const Gender = require('../models/').Gender;

/**
 * @api {get} /genders Show all genders
 * @apiName getGenders
 * @apiGroup Gender
 * @apiSuccess {String} id of the Gender.
 * @apiSuccess {String} name of the Gender.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *         
 *         "id": 1,
 *         "name": "Femme",
 *         "createdAt": "2020-02-11T13:57:17.000Z",
 *         "updatedAt": "2020-02-11T13:57:17.000Z"
 *     }]
 */
exports.gender_list = (req,res,next)=>{
    Gender.findAll({})
    .then(genders => {
        res.json(genders);
    })
    .catch(error=>{
        res.status(400);
        res.json({message : 'gender_list, il y a rien la'});
        console.log(error);
        
    })
}

/*
 * @api {get} /genders/:id Show detail of one gender
 * @apiName getGendersDetail
 * @apiGroup Gender
 * 
 * @apiParam {Number} id of the Gender
 * 
 * @apiSuccess {String} id of the Gender.
 * @apiSuccess {String} name of the Gender.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         
 *         "id": 1,
 *         "name": "Femme",
 *         "createdAt": "2020-02-11T13:57:17.000Z",
 *         "updatedAt": "2020-02-11T13:57:17.000Z"
 *     }
 */
exports.gender_detail = (req,res,next)=>{
    const id = req.params.id
    Gender.findByPk(id)
    .then(gender => {
        res.json(gender);
    })
    .catch(error=>{
        res.status(400);
        res.json({message : 'gender_detail, il y a rien la'});
    })
}

/**
 * @api {post} /genders/add Add one gender
 * @apiName addGender
 * @apiGroup Gender
 * 
 * @apiParam {String} name of the Gender.
 * @apiParamExample {json} Request-Example:
 *     {
 *         
 *         "id": 1,
 *         "name": "Femme",
 * 
 *     }
 ** 
 * @apiSuccess {String} id of the Gender.
 * @apiSuccess {String} name of the Gender.
 * @apiSuccess {Date} createdAt date of creation of the Gender.
 * @apiSuccess {Date} updatedAt last update of the Gender.
 * @apiSuccessExample {json} Success-Response:
 *     {
 *         
 *         "id": 1,
 *         "name": "Femme",
 *         "createdAt": "2020-02-11T13:57:17.000Z",
 *         "updatedAt": "2020-02-11T13:57:17.000Z"
 *     }
 */
exports.gender_add = (req,res,next) => {
    Gender.create(req.body)
    .then(gender => {
        res.json(gender);
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 * @api {put} /genders/edit/:id Edit one gender
 * @apiName editGender
 * @apiGroup Gender
 * 
 * @apiSuccess {String} id of the Gender.
 * @apiSuccess {String} name of the Gender.
 * @apiSuccess {Date} createdAt date of creation of the Gender.
 * @apiSuccess {Date} updatedAt last update of the Gender.
 * @apiSuccessExample {json} Success-Response:
 *     {
 *          "id": 1,
 *         "name": "Femme",
 *         "createdAt": "2020-02-11T13:57:17.000Z",
 *         "updatedAt": "2020-02-11T13:57:17.000Z"
 *     }
 */

exports.gender_edit = (req,res,next) => {
    const id = req.params.id;
    Gender.update(req.body, {
        where: {
          id: id
        }
    })
    .then(gender => {
        res.json(gender);
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 * @api {delete} /genders/delete/:id Delete one gender
 * @apiName deleteGender
 * @apiGroup Gender
 * 
 * @apiParam {Number} id of the Gender.
 * 
 * @apiSuccess {String} message Gender deleted.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       message: "Gender deleted"
 *     }
 */
exports.gender_delete = (req,res,next) => {
    const id = req.params.id;
    Gender.destroy({
        where: {
          id: id
        }
    })
    .then(gender => {
        res.status(200);
        res.json({message: "Gender deleted"});
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}


