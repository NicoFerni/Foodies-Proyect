import React from "react";


export default function Card({name, image, diets}){
    if (!diets.length) diets = ["Without diets"];
    else if (diets[0].name) diets = diets.map((e) => e.name);
    
    return(
        <div>
            <h3>{name}</h3>
            <img src={image} alt="img not found" width="200px" height='200px' />
            <h5>{diets}</h5>
        </div>

    )

}