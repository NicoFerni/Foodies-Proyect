const axios = require('axios');
const {Recipe, Diet} = require('../db');


const apiKey = '2ad46dc989f44d70a557ed088f952a25'

async function getApiRecipes(req, res) {
    const { name } = req.query
  
  
    if(!name){
        console.log('no tiene')
    } else{  
     const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`)
     let data = await recipes.data.results.map(el => {
       return {
           id: el.id,
           name: el.title,
           image: el.image,
           healthScore: el.healthScore,
           diets: el.diets.map(el => el),
           summary: el.summary,
           steps: e.analyzedInstructions[0]?.steps.map((e) => {
               return {
                 number: e.number,
                 step: e.step,
                 ingredients: e.ingredients,
               };
             }),
       }
       
   })}return data

}

const getDbRecipes = async () => {

    const dbRecipes = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
    return dbRecipes

}


const getAllRecipes = async() => {
const apiRecipes = await getApiRecipes();
const dbRecipes = await getDbRecipes();
const allRecipes = apiRecipes.concat(dbRecipes);
return allRecipes
}





module.exports = { getAllRecipes }


// const getRecipes = async () => {
// const recipes = await getRecipes();
// const dbRecipes = await getDbRecipes();

// const totalInfo = apiInfo.concat(dbInfo);
// return totalInfo