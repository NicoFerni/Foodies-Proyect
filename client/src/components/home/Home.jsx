import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, filterByDiet, orderByName, orderHealthScore} from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../card/Card';
import css from './Home.module.css';
import Paginate from '../paginate/Paginate';
import SearchBar from '../searchBar/SearchBar';

export default function Home (){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.filterRecipes);
    const [order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(9);
    const lastRecipeIndex = currentPage * recipesPerPage;
    const firtsRecipeIndex = lastRecipeIndex - recipesPerPage;

    const currentRecipe = allRecipes.slice(firtsRecipeIndex,lastRecipeIndex); 
    
       
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getRecipes())

    }, [dispatch])
        
    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
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
    const handleHealthOrder = (event) => {
        dispatch(orderHealthScore(event.target.value))
        setOrder(1)
        setOrder(event.target.order)
      }

    return(
        <div className={css.home}>
            <Link to = '/createRecipe' className={css.crearReceta}>Crear una receta</Link>
            <h1>Foodies</h1>

         <button onClick={e => {handleClick(e)}}>
                Volver a cargar las recetas
            </button> 
            <div>
                <select onChange={(e) => handleFilterDiet(e)}>
                    <option value='all'>All</option>
                    <option value='gluten free'>Gluten Free</option>
                    <option value='ketogenic'>Ketogenic</option>
                    <option value='vegetarian'>Vegetarian</option>
                    <option value='lacto vegetarian'>Lacto Vegetarian</option>
                    <option value='ovo vegetarian'>Ovo Vegetarian</option>
                    <option value='vegan'>Vegan</option>
                    <option value='paleolithic'>Paleolithic</option>
                    <option value='primal'>Primal</option>
                    <option value='fodmap friendly'>Fodmap friendly</option>
                    <option value='whole 30'>Whole30</option>
                </select>
                <select onChange={e => handleSort(e)}>
                    <option value='asc'>Ascending</option>
                    <option value='des'>Descending</option>
                </select>
                <select onChange={(e)=>handleHealthOrder(e)}>
                        <option value='highest'>Highest health score</option>
                        <option value='lowest'>Lowest health score</option>
                </select>

            {
            allRecipes && allRecipes.map(el =>{ 
                <Card name = {el.name} image = {el.image} diet = {el.diet} key={el.id} healthScore={el.healthScore}/>
            })
        } 
        <Paginate
        recipesPerPage={recipesPerPage}
        allRecipes = {allRecipes.length}
        paginate = {paginate}
        />

        <SearchBar/>
        
        {
            currentRecipe?.map((c) =>{
                return(
                    <div key= {c.id} className = {css.containerCard}>
                        <Link to ={`/home/${c.id}`}>
                        <Card name = {c.name} image ={c.image} diets = {c.diets} healthScore={c.healthScore} id={c.id} key = {c.name} />
                        </Link>
                    </div>
                )
                
            })
        }
            </div>
        </div>
    )

}
