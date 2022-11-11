const { getAllRecipes } = require('../controllers/controllers');
require("dotenv").config();
const {Diet} = require('../db');



 
// const diet = async (req, res) => {
//   try {
//       const data = await getAllRecipes();
//       const diets = data.map((e) => e.diets);
//       console.log(diets)
//       diets.flat().map(async (dieta) => {
//           await Diet.findOrCreate({
//             where: {
//               name: dieta,
//             },
//           });
//         });
//         const result = await Diet.findAll();
//         res.status(200).send(result);
//   }  catch (error) {
//       res.status(400).json({ Error: "Ocurrio un error al obtener las Dietas" });
//     }
//   };

    
      let dietsArr = [
        "gluten free",
        "dairy free",          
        "ketogenic",           
        "lacto vegetarian",
        "ovo vegetarian",
        "vegan",               
        "pescatarian",         
        "paleolithic",         
        "primal",              
        "fodmap friendly",     
        "whole 30"
      ]
  
    async function diet(req, res){
        try {
            dietsArr.map((d) => {
            Diet.findOrCreate({ where: { name: d } })
            })
            let diet_types = await Diet.findAll()
            res.send(diet_types)
        } 
        catch (err) {
        console.log(err)
        }
  
    }

module.exports = {
    diet
}