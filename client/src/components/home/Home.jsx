import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, filterByDiet, orderByName } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../card/Card';
import css from './Home.module.css';
import Paginate from '../paginate/Paginate';
import SearchBar from '../searchBar/SearchBar';

export default function Home (){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const [setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(9);
    const lastRecipeIndex = currentPage * recipesPerPage;
    const firtsRecipeIndex = lastRecipeIndex - recipesPerPage;
    const currentRecipe = allRecipes.slice(firtsRecipeIndex,lastRecipeIndex); 

    console.log(currentRecipe)


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(()=>{
        dispatch(getRecipes())

    }, [dispatch])
        
    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes);
    }

    function handleFilterDiet(e){
        dispatch(filterByDiet(e.target.value));
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    }

    return(
        <div className={css.home}>
            <Link to = '/recipes'>Crear una receta</Link>
            <h1>Foodies</h1>

            <button onClick={e => {handleClick(e)}}>
                Volver a cargar las recetas
            </button>
            <div>
                <select onChange={e => handleFilterDiet(e)}>
                    <option value='all'>All</option>
                    <option value='gluten free'>Gluten Free</option>
                    <option value='ketogenic'>Ketogenic</option>
                    <option value='vegetarian'>Vegetarian</option>
                    <option value='lacto-Vegetarian'>Lacto-Vegetarian</option>
                    <option value='ovo-Vegetarian'>Ovo-Vegetarian</option>
                    <option value='vegan'>Vegan</option>
                    <option value='pescetarian'>Pescetarian</option>
                    <option value='paleo'>Paleo</option>
                    <option value='low FODMAP'>Low FODMAP</option>
                    <option value='whole30'>Whole30</option>
                </select>
                <select onChange={e => handleSort(e)}>
                    <option value='asc'>Ascending</option>
                    <option value='des'>Descending</option>
                </select>
                <select>
                    <option value='health'>Health score</option>
                </select>
            
            {
            allRecipes && allRecipes.map(el =>{ 
                <Card name = {el.name} image = {el.image} diet = {el.diet} key={el.id}/>
            })
        } 
        <Paginate
        recipesPerPage={recipesPerPage}
        allRecipes = {allRecipes.length}
        paginate = {paginate}
        />

        <SearchBar/>
        
        {
            currentRecipe?.map((c, i) =>{
                return(
                    <div key= {i} className = 'cards'>
                        <Link to ={`/home/${c.id}`}>
                        <Card name = {c.name} image ={c.image} diets = {c.diets} score={c.healthyScore} key = {c.name} />
                        </Link>
                    </div>
                )
                
            })
        }
            </div>
        </div>
    )

}
