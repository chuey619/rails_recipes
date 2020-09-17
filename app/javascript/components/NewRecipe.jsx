import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from '../modules/Auth'
const NewRecipe = (props) => {
    const blankRecipe = { name: '', ingredients: '', instruction: '', image: '' }
    const [recipe, setRecipe] = useState({ ...blankRecipe })
    const method = props.location.state.method
    const stripHtmlEntities = (str) => {
        return String(str)
            .replace(/</g, "&lt")
            .replace(/>/g, "&gt;")
    }

    const onChange = (evt) => {
        setRecipe({ ...recipe, [evt.target.name]: evt.target.value })
    }

    const onSubmit = async (evt) => {
        evt.preventDefault()
        let url;
        method === 'PUT' ? url = `/recipes/${props.location.state.recipe.id}` : url = '/recipes'
        try {
            const token = document.querySelector('meta[name="csrf-token"]').content;
            let response = await fetch(url, {
                method: method,
                headers: {
                    'X-CSRF-Token': token,
                    'Content-Type': 'application/json',
                    token: Auth.getToken(),
                    'Authorization': `Token ${Auth.getToken()}`
                },
                body: JSON.stringify(recipe)
            })
            response = response.ok ? await response.json() : new Error('Network response was not ok.')
            method === 'POST' ? props.history.push(`/recipe/${response.id}`) : props.history.push(`/recipe/${props.location.state.recipe.id}`)

        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-12 col-lg-6 offset-lg-3">
                    <h1 className="font-weight-normal mb-5">
                        {method === 'PUT' ? 'Edit this recipe' : 'Add a new recipe to our awesome recipe collection.'}
                    </h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="recipeName">Recipe name</label>
                            <input
                                type="text"
                                name="name"
                                id="recipeName"
                                className="form-control"
                                required
                                onChange={onChange}
                                placeholder={props.location.state.recipe ? props.location.state.recipe.name : recipe.name}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="recipeIngredients">Ingredients</label>
                            <input
                                type="text"
                                name="ingredients"
                                id="recipeIngredients"
                                className="form-control"
                                required
                                onChange={onChange}
                                placeholder={props.location.state.recipe ? props.location.state.recipe.ingredients : ''}
                            />
                            <small id="ingredientsHelp" className="form-text text-muted">
                                Separate each ingredient with a comma.
                            </small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="recipeIngredients">Image</label>
                            <input
                                type="text"
                                name="image"
                                id="recipeImage"
                                className="form-control"
                                required
                                onChange={onChange}
                                placeholder={props.location.state.recipe ? props.location.state.recipe.image : ''}
                            />
                            <small id="ingredientsHelp" className="form-text text-muted">
                                Separate each ingredient with a comma.
                            </small>
                        </div>
                        <label htmlFor="instruction">Preparation Instructions</label>
                        <textarea
                            className="form-control"
                            id="instruction"
                            name="instruction"
                            rows="5"
                            required
                            onChange={onChange}
                            placeholder={props.location.state.recipe ? props.location.state.recipe.instruction : ''}
                        />
                        <button type="submit" className="btn custom-button mt-3">
                            Submit
                        </button>
                        <Link to="/recipes" className="btn btn-link mt-3">
                            Back to recipes
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewRecipe