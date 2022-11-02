const {Diet} = require('../db');


async function diet(req, res){

    try{
        let diets = await Diet.findAll()
        console.log('diets: ',  diets)
        res.status(200).json(diets)
     }catch(e){
         res.status(404).json({err: 'not finded'})
     }

}

module.exports = {
    diet
}