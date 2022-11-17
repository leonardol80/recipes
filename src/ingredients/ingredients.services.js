const ingredientsControllers = require('./ingredients.controllers')

const getAllIngredients = (req, res) => {
    ingredientsControllers.getAllIngredients()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err=> {
            res.status(400).json({message: err.message})
        })
}

const getIngredientsById = (req, res) => {
    const id = req.params.id
    ingredientsControllers.getIngredientsById(id)
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

const postIngredients = (req, res) => {
    const { name } = req.body

    if(name){
        ingredientsControllers.createIngredients(name)
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

const deleteIngredients = (req, res) => {
    const id = req.params.id 
    ingredientsControllers.deleteIngredients(id)
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

const patchIngredient = (req,res) => {

}

const postIngredientToUser = (req, res) => {
    const userId = req.user.id;
    const { amount } = req.body;
    const ingredientId = req.params.id;
    //* const ingredientId = req.params.ingredient_id;
  
    if (amount) {
      ingredientsControllers.addIngredientsToUser({userId, ingredientId, amount})
          .then((data) => {
              res.status(201).json(data)
          })
          .catch((err) => {
              res.status(400).json({message: err.message})
          })
    } else {
      res.status(400).json({
        message: "Missing Data",
        fields: {
          amount: "string",
        },
      });
    }
  };
  

module.exports = {
    getAllIngredients,
    getIngredientsById,
    postIngredients,
    deleteIngredients,
    patchIngredient,
    postIngredientToUser
}