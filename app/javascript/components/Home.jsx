import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
const Home = (props) => (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
            <div className="container secondary-color">
                <h1 className="display-4">Food Recipes</h1>
                <p className="lead">
                    A curated list of recipes for the best homemade meal and delicacies.
                </p>
                <hr className="my-4" />
                <div className='auth-form-container'>
                    <RegisterForm handleRegisterSubmit={props.handleRegisterSubmit} />
                    <LoginForm handleLoginSubmit={props.handleLoginSubmit} />
                </div>

            </div>
        </div>
    </div>
);

export default Home