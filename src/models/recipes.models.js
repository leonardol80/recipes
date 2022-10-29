const db = require('../utils/database')
const { DataTypes } = require("sequelize");
const Users = require('./users.models')
const Categories = require('./categories.models')

const Recipes = db.define("repices", {
    //? las FK de sequelize tienen ciertas reglas:
    //? Debe contener la tabla a la que hace referencia en singular
    //? Debe terminar con el subfijo Id
    userId : {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
            key: 'id',
            model: Users
        }
    },
    categoryId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'category_id', 
        references: {
            key: 'id',
            model: Categories
        }
    },
    origin: {
        type: DataTypes.STRING,
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

    module.exports = {
        Recipes
    }