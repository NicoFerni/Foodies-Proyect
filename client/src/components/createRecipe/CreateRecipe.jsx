import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import css from './CreateRecipe.module.css'
import { useDispatch, useSelector} from "react-redux";
import { postRecipe, getDiets } from "../../actions";

export default function CreateRecipe(){

        const dispatch = useDispatch();
        const diets = useSelector((state) => state.diets);

        const [input, setInput] = useState({
            name: '',
            summary: '',
            healthScore: 0,
            steps: '',
            dishTypes: '',
            image: '',
            diets: []
        })

        useEffect(() => {
            dispatch(getDiets(),);
        }, [])

        const validate = (input) => {
            const errors = {}
            if (!input.name) {
              errors.name = 'You must enter a name for your recipe!'
            } else if (/[^a-zA-Z, ]/g.test(input.name)) {
              errors.name = 'Name must be letters, no symbols!'
            }
            if(!input.summary) {
              errors.summary = 'You must enter a brief summary!'
            }
            if(input.healthScore > 100 || input.healthScore < 0){
              errors.healthScore = 'Score can not exceed 100, nor be negative number'
            }
            return errors
          }
        return (
            <div>
                <Link to = '/home'><button>Back</button></Link>
                <h1>Create your recipe</h1>

                <form id='form' onSubmit={(e)=>handleSubmit(e)}>
                 <div className="form">
                 <label>Enter the name of your recipe:</label>
               <input type="text" name="name" value={input.name} onChange={(e)=>handleChange(e)} required/>
                </div>
                </form>

                <div className="form">
                 <label>Enter the summary of your recipe:</label>
                 <input type="textarea" name="summary" value={input.summary} onChange={(e)=>handleChange(e)} required/>
                </div>

            </div>

        )
}