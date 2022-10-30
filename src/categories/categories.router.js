const router = require('express').Router()
const passport = require('passport')
const adminValidate = require('../middlewares/role.middleware')

const categoryServices = require('./categories.services')

//? / 
//? /:id



router.route('/')
    .get(categoryServices.getAllCategories)
    .post(
        passport.authenticate('jwt',{session:false}),
        adminValidate,
        categoryServices.postCategory) //TODO hacerla protegida por administrador

router.route('/:id')
    .get(categoryServices.getCategoryById)
    .delete(
        passport.authenticate('jwt',{session:false}),
        adminValidate,
        categoryServices.deleteCategory) //TODO hacerla protegida por administrador

module.exports = router