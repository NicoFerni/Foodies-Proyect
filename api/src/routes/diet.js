const { getAllRecipes } = require('../controllers/controllers');
require("dotenv").config();
const {Diet} = require('../db');



const diet = async (req, res) => {
      try {
          const data = await getAllRecipes();
          const diets = data.map((e) => e.diets);
          console.log(diets)
          diets.flat().map(async (dieta) => {
              await Diet.findOrCreate({
                where: {
                  name: dieta,
                },
              });
            });
            const result = await Diet.findAll();
            res.status(200).send(result);
      }  catch (error) {
          res.status(400).json({ Error: "Ocurrio un error al obtener las Dietas" });
        }
      };
    

module.exports = {
    diet
}