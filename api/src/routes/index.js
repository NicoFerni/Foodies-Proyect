const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Recipe, Diet} = require('../db');
const {Sequelize} = require('sequelize');
const apiKey = '2ad46dc989f44d70a557ed088f952a25'

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
        const url = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`)
        const info = await url.data.results.map(el => {
            return {
                id: el.id,
                title: el.title,
                image: el.image,
                healthScore: el.healthScore,
                diets: el.diets.map(el => el),
                summary: el.summary,
                steps: (el.analyzedInstructions[0] && el.analyzedInstructions[0].steps?el.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
            }
        })
        return info
}

const getDbInfo = async () => {

        const dbInfo = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
        return dbInfo

}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();

    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo
}

router.get('/recipes', async (req, res) => {
        const name = req.query.name
        const totalRecipies = await getAllRecipes();

        if (name) {
             let recipieName = await totalRecipies.filter(el => el.name === name);
            recipieName ?
          res.status(200).send(recipieName) :
          res.status(404).send('No se encuentra esa receta');
            } else {
                res.send(200).send(totalRecipies);
           }
        
router.get('/recipes/:id', async (req, res) => {
    const {id} = req.params
    let allRecipes = await getAllRecipes();
    if (id) {
        let recipesid = await allRecipes.filter(el => el.id == id);
        recipes.length?
            res.status(200).json(recipesid) :
            res.status(404).send('La id no coincide con ningun pokemon')
    }
})

router.get('/diets', async (req,res) => {
    try {
        const dietApi = await getApiInfo();
        const dietInfo = dietApi.data.results.map((e) => e.diets)
        const diets = []

        dietInfo.map((el) => {
            for (let i = 0; i < el.length; i++){
                diets.push(el[i]);
            }
        });
        diets.forEach((e) => {
            Diet.findOrCreate({
                where: {name: e}
            });
        })
        const allDiets = await Diet.findAll();
        res.status(200).send(allDiets); 
    } catch (e) {
        res.status(404).send(e.message)
    }
})

router.post('/recipes', async (req, res) => {
    let {id, title, image, healthScore, diets, summary, steps} = req.body

    if(!title) res.send('El nombre de la receta es obligatoria.');

    let newRecipe = await Recipe.create({
        
    })
})
    let dietDb = await Diet.findAll({
        where : {name : diet }
    })
    newRecipe.addDiet(dietDb)
    res.send('Receta creada correctamente.')

})




module.exports = router;
