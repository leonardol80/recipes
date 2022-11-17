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
        ingredientsServices.postIngredients) //TODO hacerla protegida por administrador

router.route('/:id')
    .get(ingredientsServices.getIngredientsById)
    .patch(
        passport.authenticate('jwt',{session:false}),
        adminValidate,
        ingredientsServices.patchIngredient
    )
    .delete(
        passport.authenticate('jwt',{session:false}),
        adminValidate,
        ingredientsServices.deleteIngredients) //TODO hacerla protegida por administrador

        router.post('/:ingredients_id/add_to_user',
        passport.authenticate('jwt',{session:false}),
        ingredientsServices.postIngredientToUser
        )
module.exports = router