
const initialState = {
    recipes : [],
    allRecipes : [],
    diets : []
}

function rootReducer(state = initialState, action){ 
    switch(action.type){
        case 'GET_RECIPES':
            return{
                ...state,
                recipes: action.payload
            }
        case 'FILTER_BY_DIET':
                const allRecipes = state.recipes
                const filteredDiet = action.payload === 'All'? allRecipes : allRecipes.filter(el => el.diet === action.payload)
            return {
                 ...state,
                 recipes: filteredDiet
            }
            default:
                return state

        case 'ORDER_BY_NAME': 
         let sortedArray = action.payload === 'asc' ?
            state.recipes.sort(function (a, b){
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name){
                    return -1;
                }
                return 0
            }):
            state.recipes.sort(function (a, b){
                if (a.name > b.name){
                    return -1;
                }
                if (b.name > a.name){
                    return 1;
                }
                return 0
            })
            return {
                ...state,
                recipes: sortedArray
            }
        case 'GET_RECIPES_NAME' :
            return {
                ...state,
                recipes: action.payload
            }
        case 'POST_RECIPE' :
            return {
                ...state,
            }
        case 'GET_DIETS': 
        return {
            ...state, 
            diets: action.payload
        }
    }
    
}

export default rootReducer;