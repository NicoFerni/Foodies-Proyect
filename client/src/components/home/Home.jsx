import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, filterByDiet, orderByName, orderHealthScore} from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../card/Card';
import css from './Home.module.css';
import Paginate from '../paginate/Paginate';
import SearchBar from '../searchBar/SearchBar';
import gifReload from "../../images/gifReload.gif"

export default function Home (){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.filterRecipes);
    const [, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(9);
    const lastRecipeIndex = currentPage * recipesPerPage;
    const firtsRecipeIndex = lastRecipeIndex - recipesPerPage;
    const currentRecipe = allRecipes.slice(firtsRecipeIndex,lastRecipeIndex); 

    useEffect(()=>{
        setCurrentPage(1)
      },[allRecipes])

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getRecipes())
    }, [dispatch])
        
    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
        setCurrentPage(1)
    }

    
    function handleFilterDiet(e){
        dispatch(filterByDiet(e.target.value));
        setCurrentPage(1)
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    }
    const handleHealthOrder = (e) => {
        e.preventDefault();
        dispatch(orderHealthScore(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.order)
      }

    return(
        <div className={css.home}>
            <h1 className={css.title}>Foodies</h1>
            <Link to = '/createRecipe' className={css.crearReceta}>Create your own recipe!</Link>
         <button onClick={e => {handleClick(e)}}>
                Refresh
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
                <select defaultValue= 'Order by name' onChange={e => handleSort(e)}>
                    <option disabled value = 'Order by name'> Order by name</option>
                    <option value='asc'>Ascending</option>
                    <option value='des'>Descending</option>
                </select>
                <select defaultValue='Health Score' onChange={(e)=>handleHealthOrder(e)}>
                        <option disabled value='Health Score' > Health score</option>
                        <option value='highest'>Highest health score</option>
                        <option value='lowest'>Lowest health score</option>
                </select>
        <Paginate 
        recipesPerPage={recipesPerPage}
        allRecipes = {allRecipes.length}
        paginate = {paginate}
        />

        <SearchBar/>
        
        <div className={css.cardContainer}>
        { !allRecipes.length?
            <div>
                <img alt='' src= {gifReload} className = {css.gif}/> 
            </div>

            :
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
        </div>
    )

}

