import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getRecipeDetail, cleanState } from "../../actions";
import { Link } from 'react-router-dom'
import css from '../detail/Detail.module.css'



function Details(props) {
        const dispatch = useDispatch()
        const recipe = useSelector(state => state.recipeDetails)


    console.log(props.match.params.id)
    useEffect(() => {
        console.log('useEffect' , recipe)
        dispatch(getRecipeDetail(props.match.params.id))
         return() => 
             dispatch(cleanState())
    }, )



    
    if(recipe && Object.values(recipe).length){
    return(
        <div>
            <h1>Name: {recipe.name}</h1>
            <h3>Summary: {recipe.summary}</h3>
            <h3>Steps: {recipe.createdAt ? recipe.steps.map((el) => el) : recipe.steps?.map((s) => s.number + ')' + s.step) }</h3>
            <img src={recipe.image} alt="img not found" width="200px" height='200px' />
            <h3>Health Score: {recipe.healthScore}</h3>
            <h3>Dish types: {recipe.dishTypes}</h3>
            <h3>Diet Type: {recipe.createdAt ? recipe.diets.map((s) => s.name + ' ') : recipe.diets}</h3>
            {/* {recipe.steps ? recipe.steps.map((s) => s.number + ')' + s.step) : recipe.steps } */}
        <Link to = '/home' >
            <button className={css.button}>Back to home</button>
        </Link>
        </div>

    )
        } else { return(
            <h1>LOADING</h1>
            )
        }
}
  
export default Details;