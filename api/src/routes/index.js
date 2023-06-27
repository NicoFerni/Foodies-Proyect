const { Router } = require('express');
const { getAllRecipes } = require('../controllers/controllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {Recipe, Diet} = require('../db');
const {Sequelize} = require('sequelize');
const { recipes, recipeId, createRecipe } = require('./recipe');
const { diet } = require('./diet');
require("dotenv").config(); 


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', recipes)
        
router.get('/recipes/:id', recipeId)

router.get('/diets', diet)

router.post('/createRecipe', createRecipe)


module.exports = router;
