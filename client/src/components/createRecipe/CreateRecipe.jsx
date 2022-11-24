import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import css from './CreateRecipe.module.css'
import { useDispatch, useSelector} from "react-redux";
import { getDiets, createRecipe } from "../../actions";

export default function CreateRecipe(){

         const history = useHistory()
         const dispatch = useDispatch();
         const diets = useSelector((state) => state.diets);
         const [errors, setErrors] = useState({});
         const [input, setInput] = useState({
             name: '',
             summary: '',
             healthScore: '',
             steps: '',
             diet: [],
             dishTypes: '',
             image: ''
         })

         useEffect(() => {
             dispatch(getDiets());
         }, [dispatch])


         const handleChange = (event) => {
          setInput({
            ...input,
            [event.target.name]: event.target.value
            
          }) 
          console.log(input)

          setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
          }))
        }

        const handleSubmit = (e) => {
          e.preventDefault()
          dispatch(createRecipe(input))
          history.push('/home')
        }
          
        
          
        const handleDiet = (event) => {
            if(event.target.checked){
              setInput({
                ...input,
                diet: !input.diet.includes(event.target.value) ? input.diet.concat(event.target.value) : input.diet
              })
            }
          }
          const validate = (input) => {
            const errors = {}
            if (!input.name) {
              errors.name = 'You must enter a name for your recipe!'
            } else if (/[^a-zA-Z, ]/g.test(input.name)) {
              errors.name = 'Name could be letters, no symbols!'
            }
            if(!input.summary) {
              errors.summary = 'You must enter a summary!'
            }
            if(input.healthScore > 100 || input.healthScore < 0){
              errors.healthScore = 'Score can not exceed 100, nor be negative number'
            }
            if(!input.steps){
              errors.steps = 'You need to type the steps!'
            }
            return errors
    
          } 

         return (
             <div className= {css.createRecipe}>
                 <Link to = '/home'><button>Back</button></Link>
                 <h1>Create your recipe</h1>

                 <form id='form' onSubmit={(e)=>handleSubmit(e)} className= 'createRecipe'>
                    <div className={css.form}>
                         <label>Enter the name of your recipe:</label>
                         <input type="text" name="name" value={input.name} onChange={(e)=>handleChange(e)} required/>
                    </div>
                 

                    <div className={css.form}>
                        <label>Enter the summary of your recipe:</label>
                        <input type="textarea" name="summary" value={input.summary} onChange={(e)=>handleChange(e)} required/>
                    </div>

                    <div className={css.form}>
                        <label>Enter the health score of your recipe:</label>
                        <input type="number" name="healthScore" value={input.healthScore} onChange={(e)=>handleChange(e)} required/>
                    </div>

                 <div className={css.form}>
                       <label>Enter a valid URL Image: </label>
                       <input type="url" name="image" value={input.image} onChange={(e)=>handleChange(e)} required/>
                 </div>

                 <div className={css.form}>
                    <label>Dish types:</label>
                    <input type="text" name="dishTypes" value={input.dishTypes} onChange={(e)=>handleChange(e)}/>
                 </div>

                 <div className={css.form}>
                    <label>Step by step instructions:</label>
                    <textarea name="steps" value={input.steps} onChange={(e)=>handleChange(e)}/>
                 </div>

                 <div id='dtypes'>
                  <label>Diet type:</label>
                  {
                    diets.map(d => {
                      return (
                        <label className="diets" key={d.id}>
                        {d.name}
                        <input type="checkbox" value={d.name} onChange={(e)=>handleDiet(e)}/>
                        </label>
                      )
                    })
                  }
                 </div>


              <button disabled={errors.name || errors.summary || errors.healthScore || errors.steps} type="submit">Enter</button>
              { errors.name && (<p className={css.danger}>{errors.name}</p>) }
              { errors.summary && (<p className={css.danger}>{errors.summary}</p>) }
              { errors.healthScore && (<p className={css.danger}>{errors.healthScore}</p>) }
              {errors.steps && (<p className={css.danger}>{errors.steps}</p>)}
               </form>
             </div>

         )
                }