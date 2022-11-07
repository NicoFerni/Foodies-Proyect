const {getAllRecipes} = require('../controllers/controllers');
const { Recipe, Diet } = require('../db');



const recipes = async (req, res) => {
    const {name} = req.query
    let allRecipes = await getAllRecipes();

    if (name) {
        let recipe = allRecipes.filter(e => e.name.toLowerCase() === (name.toLowerCase()))
        recipe.length > 0 ? 
            res.status(200).send(recipe) :
            res.status(404).send('Receta no encontrada')
    } else {
        res.status(200).send(allRecipes)
    }
}


 const createRecipe = async (req, res) => { 
     let { name, summary, healthScore, steps, diet } = req.body
     if (!name) res.send('El nombre es obligatorio');
     let newRecipe = await Recipe.create({
         name, 
         summary, 
         healthScore, 
         steps
     });
     let dietTypes = await Diet.findAll({
        where: {name: diet}    
     })
          
     newRecipe.addDiet(dietTypes);
     res.send('Receta creada con exito')
 

 }   


const recipeId = async (req, res) => {
    const {id} = req.params
    let allRecipes = await getAllRecipes();

    if(id){
        let recipe = allRecipes.filter(e => e.id == id);
        recipe.length ?
        res.status(200).json(recipe) :
        res.status(404).send('El id no coincide con ninguna receta.')
}
}
module.exports = {
    recipes,
    createRecipe,
    recipeId
}