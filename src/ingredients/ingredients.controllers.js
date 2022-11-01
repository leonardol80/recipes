const Ingredients = require('../models/ingredients.models')

//? Ver todas las categorias
//? Ver una categoria en especifico
//? Crear categoria
//? Eliminar categoria

const getAllIngredients = async () => {
    const data = await Categories.findAll()
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

module.exports = {
    getAllIngredients,
    getIngredientsById,
    createIngredients,
    deleteIngredients
}