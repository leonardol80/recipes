const typesControllers = require('./types.controllers')

const getAllTypes = (req, res) => {
    typesControllers.getAllTypes()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err=> {
            res.status(400).json({message: err.message})
        })
}

const getTypesById = (req, res) => {
    const id = req.params.id
    typesControllers.getTypesById(id)
        .then(data => {
            if(data){
                res.status(200).json(data)
            } else {
                res.status(400).json({message: `ID: ${id}, not exists`})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const postTypes = (req, res) => {
    const { name } = req.body

    if(name){
        typesControllers.createTypes(name)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err=> {
                res.status(400).json({message: err.message})
            })
    } else {
        res.status(400).json({
            message: 'Invalid data',
            fields: {
                name: 'string'
            }
        })
    }
}

const deleteTypes = (req, res) => {
    const id = req.params.id 
    typesControllers.deleteTypes(id)
        .then(data => {
            if(data){
                res.status(204).json()
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })

}

module.exports = {
    getAllTypes,
    getTypesById,
    postTypes,
    deleteTypes
}