import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesName } from "../../actions";
import css from './SearchBar.module.css'

export default function SearchBar() {
const dispatch = useDispatch();
const [name, setName] = useState('');

function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value);
}

function handleSubmit(e){
    e.preventDefault();
    dispatch(getRecipesName(name));
}

return (
        <div className= {css.searchBar}>
            <input
            type='text'
            placeholder="Search..."
            onChange = {(e) => handleInputChange(e)}
            />
            <button className={css.button} type = 'submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}