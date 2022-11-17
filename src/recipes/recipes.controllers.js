const Recipes = require('../models/recipes.models')
const Users = require('../models/users.models')
const Categories = require('../models/categories.models')
const Instructions = require('../models/instructions.models')
const RecipesIngredients = require('../models/recipes_ingredients.models')
const Ingredients = require('../models/ingredients.models')
const Types = require('../models/types.models')

const UsersIngredients = require('../models/users_ingredients.models')
const {Op} = require('sequelize')

//? Ver todas las recetas
//? Ver una receta en especifico
//? Crear receta
//? Eliminar receta
//? Modificar receta

const getAllRecipes = async () => {
    const data = await Recipes.findAll({
        attributes: {
            exclude: ['userId','categoryId','createdAt','updatedAt']
        },
        include:[
            {
                model: Categories
            },
            {
                model: Users,
                attributes: ['id','firstName','lastName']
            },
            {
                model: Instructions,
                attributes: {
                    exclude: ['id','recipeId','createdAt','updatedAt']
                }
            },
            {
                model: RecipesIngredients, // Se hace un join 
                include: {
                    model: Ingredients,
                    include: {
                        model: Types
                    }
                }
            }
        ]
    })
    return data
}

const getRecipesById = async (id) => {
    const data = await Recipes.findOne({
        where: {
            id
        },
        attributes: {
            exclude: ['userId','categoryId','createdAt','updatedAt']
        },
        include:[
            {
                model: Categories
            },
            {
                model: Users,
                attributes: ['id','firstName','lastName']
            },
            {
                model: Instructions,
                attributes: {
                    exclude: ['id','recipeId','createdAt','updatedAt']
                }
            },
            {
                model: RecipesIngredients, // Se hace un join 
                include: {
                    model: Ingredients,
                    include: {
                        model: Types
                    }
                }
            }
        ]
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

const getMyRecipes = async(userId) => {
    const userIngredients = await UsersIngredients.findAll({
        attributes: ['ingredientId'],
        where: {
            userId
        }
    })
    const filteredIngredients = userIngredients.map(obj => obj.ingredientId)
    
    //?Filtra las recetas a los que pertenecen esos ingredientes
    const recipeIngredients = await RecipesIngredients.findAll({
        where: {
            ingredientId: {
                [Op.in]: filteredIngredients
            }
        }
    })

    //? Busca las recetas donde el id de la receta aparezca dentro del arreglo
    const filteredRecipes = recipeIngredients.map(obj => obj.recipeId)
    const data = await Recipes.findAll({
        where: {
            id: {
                [Op.in]: filteredRecipes
            }
        }
    })

    return data
}

// getMyRecipes('')
// .then(data => console.log(data))
// .catch(err => console.log(err))


module.exports = {
    getAllRecipes,
    getRecipesById,
    createRecipes,
    updateRecipes,
    deleteRecipes,
    getMyRecipes
}