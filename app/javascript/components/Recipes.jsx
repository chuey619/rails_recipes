import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Recipes = (props) => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        let fetchRecipes = async () => {
            try {
                const url = '/recipes/index'
                let response = await fetch(url)
                response = response.ok ? await response.json() : new Error('Network response was not ok.')
                setRecipes(response)
            } catch (error) {
                props.history.push('/')
            }
        }
        fetchRecipes()
    }, [])

    const renderRecipes = () => {
        const allRecipes = recipes.map((recipe, index) => (
            <div key={index} className="col-md-6 col-lg-4">
                <div className="card mb-4">
                    <img
                        src={recipe.image}
                        className="card-img-top"
                        alt={`${recipe.name} image`}
                        style={{ objectFit: 'contain' }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{recipe.name}</h5>
                        <Link to={`/recipe/${recipe.id}`} className="btn custom-button">
                            View Recipe
                        </Link>
                    </div>
                </div>
            </div>
        ));
        return allRecipes
    }
    const noRecipe = (
        <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
            <h4>
                No recipes yet. Why not create one
            </h4>
        </div>
    );

    return (
        <>
            <section className="jumbotron jumbotron-fluid text-center">
                <div className="container py-5">
                    <h1 className="display-4">Recipes for every occasion</h1>
                    <p className="lead text-muted">
                        We’ve pulled together our most popular recipes, our latest
                        additions, and our editor’s picks, so there’s sure to be something
                        tempting for you to try.
                    </p>
                </div>
            </section>
            <div className="py-5">
                <main className="container">
                    <div className="text-right mb-3">
                        <Link className='btn custom-button' to={{
                            pathname: '/recipe',
                            state: {
                                method: 'POST',
                                recipe: null
                            }
                        }}>Add a new Recipe</Link>
                    </div>
                    <div className="row">
                        {recipes.length > 0 ? renderRecipes() : noRecipe}
                    </div>
                    <Link to="/" className="btn btn-link">
                        Home
                    </Link>
                </main>
            </div>
        </>
    )
}

export default Recipes