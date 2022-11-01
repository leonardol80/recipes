const router = require('express').Router()
const passport = require('passport')
const adminValidate = require('../middlewares/role.middleware')

const ingredientsServices = require('./ingredients.services')

//? / 
//? /:id



router.route('/')
    .get(ingredientsServices.getAllIngredients)
    .post(
        passport.authenticate('jwt',{session:false}),
        adminValidate,
        categoryServices.postCategory) //TODO hacerla protegida por administrador

router.route('/:id')
    .get(ingredientsServices.getIngredientsById)
    .delete(
        passport.authenticate('jwt',{session:false}),
        adminValidate,
        ingredientsServices.deleteIngredients) //TODO hacerla protegida por administrador

module.exports = router