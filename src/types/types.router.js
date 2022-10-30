const router = require('express').Router()
const passport = require('passport')
const adminValidate = require('../middlewares/role.middleware')

const typesServices = require('./types.services')

//? / 
//? /:id



router.route('/')
    .get(typesServices.getAllTypes)
    .post(
        passport.authenticate('jwt',{session:false}),
        adminValidate,
        typesServices.postTypes) //TODO hacerla protegida por administrador

router.route('/:id')
    .get(typesServices.getTypesById)
    .delete(
        passport.authenticate('jwt',{session:false}),
        adminValidate,
        typesServices.deleteTypes) //TODO hacerla protegida por administrador

module.exports = router