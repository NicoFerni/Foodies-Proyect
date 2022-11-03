const axios = require('axios');
const {Recipe, Diet} = require('../db');
const { YOUR_API_KEY } = process.env;

const getApiRecipes = async() => {
    
      const apiEnd = await axios
              .get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=b19d5ce9f33240009efe8bb2d05dffd6&addRecipeInformation=true&number=100`)
              .then((e) => e.data)
              .then(data => {
              const apiInfo = data.results.map((el)=>({
              id: el.id,
              name: el.title,
              image: el.image,
              healthScore: el.healthScore,
              diets: el.diets.map(el => el),
              summary: el.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
              steps: el.analyzedInstructions[0]?.steps
              .map((e) => {
                return {
                  number: e.number,
                  step: e.step,
                  ingredients: e.ingredients, 
              }})
            }))
              return apiInfo;
         });
         return apiEnd;
     };
      
// const getRecipeById = async (id) => {
//   const booleanOfRegExp = id.match(/[a-z]/g); 
//   if (booleanOfRegExp?.length) {
//     return false;
// } try {
//   const { data } = await axios.get(
//     `https://api.spoonacular.com/recipes/${id}/information?apiKey=b19d5ce9f33240009efe8bb2d05dffd6`
//   ); 
//    let apiId = {
//     id: data.id,
//     name: data.title,
//     summary: data.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
//     image: data.image,
//     diets: data.diets,
//     healthScore: data.healthScore,
//     summary: data.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
//     steps: data.analyzedInstructions[0]?.steps
//     .map((e) => {
//       return {
//         number: e.number,
//         step: e.step,
//         ingredients: e.ingredients,
//    }})
//   }
//   return apiId;
// }
// catch (e) {
//   return `A recipe with the id ${id} does not exist.`;
// }
// };

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
