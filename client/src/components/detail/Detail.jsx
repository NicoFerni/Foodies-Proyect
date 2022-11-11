import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getRecipeDetail, cleanState } from "../../actions";
import { Link } from 'react-router-dom'



function Details(props) {
        const dispatch = useDispatch()
        const recipe = useSelector(state => state.recipeDetails)


    console.log(props.match.params.id)
    useEffect(() => {
        console.log('useEffect' , recipe)
        dispatch(getRecipeDetail(props.match.params.id))
         return() => 
             dispatch(cleanState())
    }, [])


    if(recipe && Object.values(recipe).length){
    return(
        <div>
            <h3>Name: {recipe.name}</h3>
            <h1>Summary: {recipe.summary}</h1>

            {/* <h2>
          Steps: <ol>{recipe.steps.split('-|-').map((s,i)=>(
            <li key={i}>{i+1+')'+s}</li>
          ))}</ol>
          </h2> */}
          <img src={recipe.image} alt="img not found" width="200px" height='200px' />
          <h3>Health Score: {recipe.healthScore}</h3>
        <h3>Dish types: {recipe.dishTypes}</h3>
        <h3>Diet Type: {recipe.diets}</h3>

        <Link to = '/home'>
            <button>Back to home</button>
        </Link>
        </div>

    )
        } else { return(
            <h1>LOADING</h1>
            )
        }
}
  
export default Details;