const { DataTypes } = require('sequelize')

const db = require('../utils/database')
const { Recipes } = require('./recipes.models')

// const Types = require('./types.models')

const Instructions = db.define('instructions', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    }, 
    descriptions: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    step: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    recipeId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'recipe_id',
        references: {
            key: 'id',
            models: Recipes
        }
    }
})

module.exports = Instructions