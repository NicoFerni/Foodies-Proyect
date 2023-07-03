require("dotenv").config();
const axios = require('axios');
const {Recipe, Diet} = require('../db');
const { YOUR_API_KEY } = process.env;


const getApiRecipes = async() => {
    const apiEnd = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)
           let info = apiEnd.data.results.map((el) => {
            return {
                id: el.id,
                name: el.title,
                image: el.image,
                healthScore: el.healthScore,
                diets: el.diets.map(el => el).join(','), 
                dishTypes:el.dishTypes.map(el => el),
                summary: el.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
                steps: el.analyzedInstructions[0]?.steps
                .map((e) => {
                  return {
                    number: e.number,
                    step: e.step,
                    ingredients: e.ingredients, 
                }})
            }
           } 
           ) 
           return info
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





module.exports = { getAllRecipes}
