const router = require('express').Router()
const passport = require('passport')
const adminValidate = require('../middlewares/role.middleware')

const recipesServices = require('./recipes.services')

//? /recipes 
//? /recipes/:recipes_id



router.route('/')
    .get(recipesServices.getAllRecipes)
    .post(
        passport.authenticate('jwt',{session:false}),
        recipesServices.postRecipes) 

router.route('/:id')
    .get(recipesServices.getRecipesById)
    
    .patch(
        passport.authenticate('jwt',{session:false}),
        recipesServices.patchRecipes
    )
    .delete(
        passport.authenticate('jwt',{session:false}),
        recipesServices.deleteRecipes
        ) 

module.exports = router