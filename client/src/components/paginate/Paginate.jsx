import React from "react";
import css from './Paginate.module.css';

export default function Paginate ({recipesPerPage, allRecipes, paginate}){
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumber.push(i);
    }
    
    return (
        <nav>
          
            <ul className={css.paginate}>
                {
                    pageNumber && pageNumber.map(number =>(
                      
                         <a href={() => false} onClick={() => paginate(number)} key={number} className={css.number}> {number} </a>
                        
                    ))
                }
            </ul>
            
        </nav>
    )       
}