const Types = require('../models/types.models')

//? Ver todas las categorias
//? Ver una categoria en especifico
//? Crear categoria
//? Eliminar categoria

const getAllTypes = async () => {
    const data = await Types.findAll()
    return data
}

const getTypesById = async (id) => {
    const data = await Types.findOne({
        where: {
            id
        }
    })
    return data
}

const createTypes = async (name) => {
    const data = await Types.create({
        name
    })
    return data
}

const deleteTypes = async (id) => {
    const data = await Types.destroy({
        where: {
            id
        }
    })
    return data
}

module.exports = {
    getAllTypes,
    getTypesById,
    createTypes,
    deleteTypes
}