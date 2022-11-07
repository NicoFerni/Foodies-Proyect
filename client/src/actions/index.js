import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES';
export const FILTER_BY_DIET  = 'FILTER_BY_DIET';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const GET_RECIPE_NAME = 'GET_RECIPE_NAME';

export function getRecipes(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/recipes', {});
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
    
}

export function getDiets(){
    return async function (dispatch){
        const info = await axios('http://localhost:3001/diets', {})
        return dispatch({type: 'GET_DIETS', payload: info.data} )
    }
}

export function postRecipe(payload){
    return async function (dispatch){
        const response = await axios.post('http://localhost:3001/recipes', payload);
        console.log(response);
        return response;
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

export function getRecipesName(name){
    return async function (dispatch){
        try{
            var json = await axios.get('http://localhost:3001/recipes?name=' + name);
            return dispatch ({
                type: 'GET_RECIPES_NAME',
                dispatch: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}