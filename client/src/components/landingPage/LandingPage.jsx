import React from "react";
import { Link } from "react-router-dom";
import css from './LandingPage.module.css';

export default function LandingPage(){
    return(
        <div className = {css.landingPage}>
            <h1 className={css.title}>Welcome to Foddies!</h1>
            <Link to ='/home'>
                <button className={css.button}>Enter</button>
            </Link>

        </div>
    )}