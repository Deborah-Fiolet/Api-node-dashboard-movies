const Category = require('../models').Category;
const Movie = require('../models/').Movie;
const sequelize = require('sequelize');

/**
 * @api {get} /categories Show all categories
 * @apiName getMoviecategorys
 * @apiGroup Category
 * @apiSuccess {String} _id id of the Category.
 * @apiSuccess {String} name name of the Category.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "id": 1,
 *       "name": "humoristique"
 *     }]
 */
exports.category_list = (req,res,next)=>{
    Category.findAll({})
    .then(categories => {
        res.json(categories);
    })
    .catch(error=>{
        res.status(400);
        res.json({error});
    })
}

/**
 *  * @api {get} /categories/:id Show detail of one category
 * @apiName getCategorysDetail
 * @apiGroup Category<
 * 
 * @apiParam {Number} id of the Category
 * 
 * @apiSuccess {String} _id id of the Category.
 * @apiSuccess {String} name name of the Category.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "id": 1,
 *       "name": "humoristique"
 *     }]
 */
exports.category_detail = (req,res,next)=>{
    const id = req.params.id
    Category.findByPk(id)
    .then(category => {
        res.json(category);
    })
    .catch(error=>{
        res.status(400);
        res.json({message : 'il y a rien la'});
    })
}

exports.category_count= (req,res,next)=>{
    Movie.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('categoryId')), 'value'],[sequelize.col('Category.name'), 'data']],
        include : [ 
            { 
                model: Category,
                attributes: ['name'],
            },
        ],
        group:['categoryId'],
        raw: false,
    })
    .then(data => res.json(data))
    .catch(error=>{
        res.status(400);
        res.json({message : 'il y a rien la'});
    })
}

/**
 * @api {post} /categories/add Add one category
 * @apiName addCategory
 * @apiGroup Category
 * 
 * @apiParam {String} name of the Category.
 * @apiParamExample {json} Request-Example:
*     {
*       "name": "Humoristique"
*     }
 * 
 * @apiSuccess {String} id of the Category.
 * @apiSuccess {String} name of the Category.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Humoristique"
 *     }
 */
exports.category_add = (req,res,next) => {
    Category.create(req.body)
    .then(category => {
        res.json(category);
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 * @api {put} /categories/edit/:id Edit one category
 * @apiName editCategory
 * @apiGroup Category
 * 
 * @apiParam {Number} id of the Category.
 * @apiParam {String} name of the Category.
 * @apiParamExample {json} Request-Example:
*     {
*       "name": "Humoristique"
*     }
 * 
 * @apiSuccess {String} _id id of the Category.
 * @apiSuccess {String} name name of the Category.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Humoristique"
 *     }
 */
exports.category_edit = (req,res,next) => {
    const id = req.params.id;
    Category.update(req.body, {
        where: {
          id: id
        }
    })
    .then(category => {
        res.json({message: `Category ${id} est modifie`});
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}

/**
 * @api {delete} /categories/delete/:id Delete one category
 * @apiName deleteCategory
 * @apiGroup Category
 * 
 * @apiParam {Number} id of the Category.
 * 
 * @apiSuccess {String} message Category deleted.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       message: "Category deleted"
 *     }
 */
exports.category_delete = (req,res,next) => {
    const id = req.params.id;
    Category.destroy({
        where: {
          id: id
        }
    })
    .then(category => {
        res.json({message: "Category deleted"});
    })
    .catch(error=>{
        res.status(400);
        res.json(error);
    })
}


