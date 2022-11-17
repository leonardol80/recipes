const recipesControllers = require('./recipes.controllers')

const getAllRecipes = (req, res) => {
    recipesControllers.getAllRecipes()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err=> {
            res.status(400).json({message: err.message})
        })
}

//? /api/v1/recipe/2/ingredients/8
//? router.get('/api/v1/recipe/:recipe_id/ingredients/:ingredients_id')
const getRecipesById = (req, res) => {
    const id = req.params.id  //tembien de recipe_id
    recipesControllers.getRecipesById(id)
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

const postRecipes = (req, res) => {
    const userId = req.user.id
    const { title, description, urlImg, time, portions, categoryId, origin } = req.body

    if(title && description && time && portions && categoryId){
        recipesControllers.createRecipes(title, description, urlImg, time, portions, categoryId, origin, userId)
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
                title: 'string',
                description: 'text',
                time: 'number',
                portions: 'number',
                categoryId: 'number',
            }
        })
    }
}

const patchRecipes = (req,res) => {
    const {title, description, urlImg,time,portions,categoryId,origin} = req.body
    const id = req.params.id
    recipesControllers,updateRecipes(id,{title, description,urlImg,time,portions,categoryId,origin})
    .then(data => {
        if(data[0]){
            res.status(200).json({message: `Recipe with id ${id} edited succesfully`})
        } else {
            res.status(404).json({message:`ID: ${id} missing`})
        }
    })
    .catch()
    res.status(400).json({message: err.message})
}


const deleteRecipes = (req, res) => {
    const id = req.params.id 
    recipesControllers.deleteRecipes(id)
        .then(data => {
            if(data){
                res.status(204).json()
            } else {
                res.status(404).json({message: 'Invalid ID ',id})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })

}

const getUserRecipes = (req, res) => {
    const userId = req.user.id
    recipesControllers.getMyRecipes(userId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch( err => {
            res.status(400).json({message: err.message})
        })
}


module.exports = {
    getAllRecipes,
    getRecipesById,
    postRecipes,
    patchRecipes,
    deleteRecipes,
    getUserRecipes
}