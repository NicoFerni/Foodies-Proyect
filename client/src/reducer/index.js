


const initialState = {
    recipes : [],
    allRecipes : [],
    diets : [],
    filterRecipes: [],
    recipeDetails: {},
}

function rootReducer(state = initialState, action){ 
    switch(action.type){
        case 'GET_RECIPES':
            return{
                ...state,
                allRecipes: action.payload,
                recipes: action.payload,
                filterRecipes: action.payload
            }
        case 'FILTER_BY_DIET':
                const allRecipes = state.recipes

                const filteredDiet = action.payload === 'all'? allRecipes : allRecipes.filter(el => el.diets?.includes(action.payload))
            
            return {
                 ...state,
                 filterRecipes: filteredDiet
            }
            default:
                return state

        case 'ORDER_BY_NAME': 
         let sortedArray = action.payload === 'asc' ?
            state.recipes.sort(function (a, b){
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()){
                    return -1;
                }
                return 0
            }):
            state.recipes.sort(function (a, b){
                if (a.name.toLowerCase() > b.name.toLowerCase()){ 
                    return -1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()){
                    return 1;
                }
                return 0
            })
            return {
                ...state,
                filterRecipes: sortedArray
            }
        case 'GET_RECIPES_NAME' :
            return {
                ...state,
                filterRecipes: action.payload
            }
        case 'GET_DIETS': 
        return {
            ...state, 
            diets: action.payload
        }
        
        case 'GET_RECIPE_DETAILS':
            console.log('reducer', action.payload[0])
            return {
                ...state,
                recipeDetails: action.payload[0],
            }
        
        case 'CLEAN_STATE' :
            return {
                ...state,
                recipeDetails: [],
            }
        // case 'ORDER_HEALTH_SCORE':
        //     const orderhealthScore = (value) => {
        //             if (value === 'none') {
        //                 return state.recipes
        //             }
        //             else if(value === 'highest'){
        //                 const highest = state.recipes.sort((a, b) => b.healthScore - a.healthScore)
        //                 return highest
        //                 }
        //             else if(value === 'lowest'){
        //                 const lowest = state.recipes.sort((a, b) => a.healthScore - b.healthScore)
        //                 return lowest
        //                 }
        //             else return state.recipes
        //             }
        //         return {
        //             ...state,
        //             filterRecipes: orderhealthScore(action.payload)
        //         }
        case 'ORDER_HEALTH_SCORE':
            let orderhealthScore = action.payload === 'lowest' ?
            state.recipes.sort(function(a, b){
                if(a.healthScore > b.healthScore){
                    return 1
                }
                if (b.healthScore > a.healthScore) {
                    return -1;
                  }
                    return 0;
            }) :
            state.recipes.sort((a, b) => {
                if (a.healthScore > b.healthScore) {
                     return 1;
                }
                if (b.healthScore > a.healthScore) {
                     return -1;
                }
                    return 0;
                })
            
                 return {
                ...state,
                filterRecipes: orderhealthScore
            }
        }
 }
        
export default rootReducer;