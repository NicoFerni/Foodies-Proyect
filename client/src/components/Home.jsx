import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';


export default function Home (){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);

    useEffect(()=>{
        dispatch(getRecipes())

    }, [dispatch])
    
    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes);
    }

    return(
        <div>
            <Link to = '/recipes'>Crear una receta</Link>
            <h1>Henry Food</h1>

            <button onClick={e => {handleClick(e)}}>
                Volver a cargar las recetas
            </button>
            <div>
                <select>
                    <option value='diet'>Diet type</option>
                </select>
                <select>
                    <option value='asc'>Ascending</option>
                    <option value='des'>Descending</option>
                </select>
                <select>
                    <option value='health'>Health score</option>
                </select>
                <select>
                    <option value='all'>All</option>
                    <option value='created'>Created</option>
                    <option value='api'>Existent</option>
                </select>
        {
            allRecipes?.map((c) =>{
                return(
                    <Fragment classname = 'cards'>
                        <Link to ={`/home${c.id}`}>
                        <Card title = {c.title} image ={c.image} diets = {c.diets} key = {c.id} />
                        </Link>
 
                    </Fragment>
                )
                
            })
        }
            </div>
        </div>
    )

}

// tipo de dieta
// orden alfabetico (ascendente, descendente)
// por health score
