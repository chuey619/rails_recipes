import React, { Component } from "react";

import Auth from '../modules/Auth'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "../components/Home";
import Recipes from '../components/Recipes'
import Recipe from '../components/Recipe'
import NewRecipe from "../components/NewRecipe";
class App extends Component {
    constructor(props) {
        super()
        this.state = {
            auth: Auth.isUserAuthenticated(),
            redirect: false
        }
    }
    handleRegisterSubmit = async (e, data) => {
        e.preventDefault()
        let response = fetch('/users', {
            method: 'POST',
            body: JSON.stringify({
                user: data
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let json = await (await response).json()
        Auth.authenticateToken(json.token)
        this.setState({
            auth: Auth.isUserAuthenticated(),
            redirect: true
        })
    }
    handleLoginSubmit = async (e, data) => {
        e.preventDefault()
        let response = fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let json = await (await response).json()
        Auth.authenticateToken(json.token)
        this.setState({
            auth: Auth.isUserAuthenticated(),
            redirect: true
        })
    }
    render() {
        return (
            <Router>
                {this.state.redirect && <Redirect to='/recipes' />}
                <Switch>
                    <Route exact path="/" render={(props) => <Home handleLoginSubmit={this.handleLoginSubmit} handleRegisterSubmit={this.handleRegisterSubmit} />} />
                    <Route path='/recipes' exact component={Recipes} />
                    <Route path="/recipe/:id" exact component={Recipe} />
                    <Route path="/recipe" exact component={NewRecipe} />
                </Switch>
            </Router>
        )
    }
}
export default App