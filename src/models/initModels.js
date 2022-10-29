//? Importacion de todos los modelos

const Users = require('./users.models')
const Categories = require('./categories.models')
const Ingredients = require('./ingredients.models')
const Instructions = require('./instructions.models')
const RecipesIngredients = require('./recipes_ingredients.models')
const Recipes = require('./recipes.models')
const Types = require('./types.models')
const UsersIngredients = require('./users_ingredients.models')
const UsersRecipes = require('./users_recipes.models')

const initModels = () => {
    // Relaciones
    //? hasMany llave foranea dentro de parentesis
    //? belongsTo llave foranea en primer paramentro

    //* Users 1:M Recipes
    Users.hasMany(Recipes)
    Recipes.belongsTo(Users)

    //* Users 1:M UserRecipes
    Users.hasMany(UsersRecipes)
    UsersRecipes.belongsTo(Users)

    //* Recipes 1:M UserRecipes (Resultante muchos a muchos)
    Recipes.hasMany(UsersRecipes)
    UsersRecipes.belongsTo(Recipes)


    //* Users 1:M UserIngredients (Resultante muchos a muchos)
    Users.hasMany(UsersIngredients)
    UsersIngredients.belongsTo(Users)

    //* Ingredients 1:M UserIngredients
    Ingredients.hasMany(UsersIngredients)
    UsersIngredients.belongsTo(Ingredients)

}

module.exports = initModels