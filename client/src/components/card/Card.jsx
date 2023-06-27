import React from "react";
import css from './Card.module.css';
import { Link } from "react-router-dom";

export default function Card({name, image, diets, id, healthScore}){
    if (!diets.length) diets = ["Without diets"];
    else if (diets[0].name) diets = diets.map((e) => e.name);
    
    return(
        <div className={css.card}>
            <div>
            <img src={image} alt="img not found" width="200px" height='200px' />
            </div>
            <div>
                 <h3 className={css.name}>{name}</h3>
            </div> 
            <div> HealthScore: {healthScore}</div>
        
            <h5 className={css.diet}>{diets}</h5>
            <Link to={`/details/${id}`}>
            <button>i</button>
            </Link>
        </div>

    )

}