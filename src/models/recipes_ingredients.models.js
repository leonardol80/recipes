const { DataTypes } = require('sequelize')

const db = require('../utils/database')
const { Ingredients } = require('./ingredients.models')

const Recipes = require('./recipes.models')


const RecipesIngredients = db.define('recipes_ingredients', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    }, 
    amount: {  //Cantidades que se usasn Eje 2 Huevos
        type: DataTypes.STRING,
        allowNull: false,
    },
    recipeId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'recipe_id',
        references: {
            key : 'id',
            models: Recipes
        }
    },
    ingredientId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'ingredient_id',
        references: {
            key: 'id',
            models: Ingredients
        }
    }
})

module.exports = RecipesIngredients