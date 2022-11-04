
const initialState = {
    recipes : []
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
    }

}

export default rootReducer;