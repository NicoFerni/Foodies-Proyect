import axios from 'axios';


export function getRecipes(){
    return async function(dispatch){
        let json = await axios.get('/recipes');
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })  
    }
    
}

export function getDiets(){
    return async function (dispatch){
        const info = await axios('/diets', {})
        return dispatch({type: 'GET_DIETS', payload: info.data} )
    }
}

export function createRecipe(payload){
    return async function (dispatch){
        return await axios.post('/createRecipe', payload);
    }
}


export function filterByDiet(payload){
    return{
        type: 'FILTER_BY_DIET',
        payload
    }
}

export function orderByName(payload){
    return{
        type:'ORDER_BY_NAME',
        payload
    }
}

//  export function paginateSearchBar(payload){
//      return{
//          type:'PAGINATE_SEARCHBAR',
//          payload
//      }
//  }

export function getRecipesName(name){
    return async function (dispatch){
        try{
            var json = await axios.get('/recipes?name=' + name);
            return dispatch ({
                type: 'GET_RECIPES_NAME',
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export const getRecipeDetail = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`/recipes/${id}`)
        console.log('detalle' , response.data)
        return dispatch({ type: 'GET_RECIPE_DETAILS', payload: response.data })
        
    }   
}

export const cleanState = () => {
    return {
        type: 'CLEAN_STATE'
    }
}

export const orderHealthScore = (value) => {
    return {
        type: 'ORDER_HEALTH_SCORE',
        payload: value
    }
}
