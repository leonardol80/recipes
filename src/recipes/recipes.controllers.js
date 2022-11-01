const Recipes = require('../models/recipes.models')

//? Ver todas las recetas
//? Ver una receta en especifico
//? Crear receta
//? Eliminar receta
//? Modificar receta

const getAllRecipes = async () => {
    const data = await Recipes.findAll()
    return data
}

const getRecipesById = async (id) => {
    const data = await Recipes.findOne({
        where: {
            id
        }
    })
    return data
}

const createRecipes = async (data) => {
    const response = await Recipes.create({
        id: uuid.v4(),
        title: data.title,
        description: data.description,
        urlImg: data.urlImg,
        time: data.time,
        portions: data.portions,
        userId: data.userId,
        categoryId: data.categoryId,
        origin: data.origin,
        likes: data.likes

    })
    return response
}

const updateRecipes = async (id,data)=>{
    const response = await Recipes.update(data,{
        where: {
            id
        }
    })
    return response
}

const deleteRecipes = async (id) => {
    const data = await Recipes.destroy({
        where: {
            id
        }
    })
    return data
}

module.exports = {
    getAllRecipes,
    getRecipesById,
    createRecipes,
    updateRecipes,
    deleteRecipes
}