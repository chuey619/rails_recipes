import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from '../modules/Auth'
const Recipe = (props) => {
    const [recipe, setRecipe] = useState({})
    const [user, setUser] = useState('')
    useEffect(() => {
        let fetchRecipe = async () => {
            try {
                let id = parseInt(props.match.params.id)
                const url = `/recipes/show/${id}`
                console.log(url)
                let response = await fetch(url)
                response = response.ok ? await response.json() : new Error('Network response was not ok.')
                setRecipe(response.recipe)
                setUser(response.user)
            } catch {
                props.history.push('/recipes')
            }
        }
        fetchRecipe()
    }, [])

    const deleteRecipe = async () => {
        try {
            let id = parseInt(props.match.params.id)
            const url = `/recipes/destroy/${id}`
            const token = document.querySelector('meta[name="csrf-token"]').content;
            let response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-Token': token,
                    'Content-Type': 'application/json',
                    token: Auth.getToken(),
                    'Authorization': `Token ${Auth.getToken()}`
                }
            })
            response = response.ok ? await response.json() : new Error('Network response was not ok.')
            props.history.push('/recipes')
        } catch (error) {
            console.log(error.message)
        }

    }

    const ingredientList = () => {
        if (recipe.ingredients) {
            return recipe.ingredients
                .split(",")
                .map((ingredient, index) => (
                    <li key={index} className="list-group-item">
                        {ingredient}
                    </li>
                ));
        }
    }

    const addHtmlEntities = (str) => {
        return String(str)
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
    }

    const recipeInstruction = () => {
        return addHtmlEntities(recipe.instruction)
    }
    return (
        <div className="">
            <div className="hero position-relative d-flex align-items-center justify-content-center">
                <img
                    src={recipe.image}
                    alt={`${recipe.name} image`}
                    className="img-fluid position-absolute"
                />
                <div className="overlay bg-dark position-absolute" />
                <h1 className="display-4 position-relative text-white">
                    {recipe.name} by {user}
                </h1>
            </div>
            <div className="container py-5">
                <div className="row">
                    <div className="col-sm-12 col-lg-3">
                        <ul className="list-group">
                            <h5 className="mb-2">Ingredients</h5>
                            {ingredientList()}
                        </ul>
                    </div>
                    <div className="col-sm-12 col-lg-7">
                        <h5 className="mb-2">Preparation Instructions</h5>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: `${recipeInstruction()}`
                            }}
                        />
                    </div>
                    <div className="col-sm-12 col-lg-2">
                        <button type="button" className="btn btn-danger" onClick={deleteRecipe}>
                            Delete Recipe
                        </button>
                        <Link className='btn btn-primary' to={{
                            pathname: '/recipe',
                            state: {
                                method: 'PUT',
                                recipe: recipe
                            }
                        }}>Edit Recipe</Link>
                    </div>
                </div>
                <Link to="/recipes" className="btn btn-link">
                    Back to recipes
                </Link>
            </div>
        </div>
    )
}

export default Recipe