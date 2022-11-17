//? Dependencies
const express = require('express');
const cors = require('cors')
const db = require('./utils/database')
const swaggerUi = require('swagger-ui-express')

//? Files
const {port} = require('./config');
const swaggerDoc = require('../swagger.json')

//* Routes
const userRouter = require('./users/users.router')
const authRouter = require('./auth/auth.router')
const categoryRouter = require('./categories/categories.router')
const typesRouter = require('./types/types.router')
const recipesRouter = require('./recipes/recipes.router')
const ingredientsRouter = require('./ingredients/ingredients.router')



const initModels = require('./models/initModels')

//? Initial Configs
const app = express()

app.use(express.json())

app.use(cors())

db.authenticate()
.then( ()=>{
    console.log('Database Authenticated')
})
.catch(err =>{
    console.log(err)
})

db.sync()
.then(()=>{
    console.log('Database Synced')
})
.catch(err => {
    console.log(err)
})

initModels()

app.get('/', (req,res,next)=>{
    console.log(req.method)
    next()
}, (req, res) => {
    res.status(200).json({
        message: 'OK!',
        users: `localhost:${port}/api/v1/users`
    })
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/categories',categoryRouter)
app.use('/api/v1/types',typesRouter)
app.use('/api/v1/recipes',recipesRouter)
app.use('/api/v1/ingredients',ingredientsRouter)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})

