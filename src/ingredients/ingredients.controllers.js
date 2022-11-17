const uuid = require('uuid')

const Ingredients = require('../models/ingredients.models')
const UsersIngredients = require('../models/users_ingredients.models')

//? Ver todas las categorias
//? Ver una categoria en especifico
//? Crear categoria
//? Eliminar categoria

const getAllIngredients = async () => {
    const data = await Ingredients.findAll()
    return data
}

const getIngredientsById = async (id) => {
    const data = await Ingredients.findOne({
        where: {
            id
        }
    })
    return data
}

const createIngredients = async (name) => {
    const data = await Ingredients.create({
        name
    })
    return data
}

const deleteIngredients = async (id) => {
    const data = await Ingredients.destroy({
        where: {
            id
        }
    })
    return data
}

const addIngredientsToUser= async(data) =>{
        const response = await UsersIngredients.create({
            id: uuid.v4(),
            amount: data.amount,
            userId: data.userId,
            ingredientId: data.ingredientId
        })
        return response
}

module.exports = {
    getAllIngredients,
    getIngredientsById,
    createIngredients,
    deleteIngredients,
    addIngredientsToUser
}