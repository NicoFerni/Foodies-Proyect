import React from "react";
import css from './Card.module.css'

export default function Card({name, image, diets}){
    if (!diets.length) diets = ["Without diets"];
    else if (diets[0].name) diets = diets.map((e) => e.name);
    
    return(
        <div className={css.card}>
            <h3 className={css.name}>{name}</h3>
            <img src={image} alt="img not found" width="200px" height='200px' />
            <h5 className={css.diet}>{diets}</h5>
        </div>

    )

}