import React, { Component } from 'react'

class RegisterForm extends Component {
    constructor(props) {
        super()
        this.state = {
            username: '',
            password: '',
            email: ''
        }

    }
    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value
        })
    }
    render() {
        return (

            <form className='auth-form' onSubmit={(e) => this.props.handleRegisterSubmit(e, this.state)}>
                <div className='form-group'>
                    <label>Username</label>
                    <input className='form-control' type='text' name='username' value={this.state.name} onChange={this.handleChange} />
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input className='form-control' type='text' name='email' value={this.state.email} onChange={this.handleChange} />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input className='form-control' type='password' name='password' placeholder='password' value={this.state.password} onChange={this.handleChange} />
                </div>
                <button type="submit" className="btn custom-button mt-3">
                    Register
                </button>
            </form>

        )
    }
}

export default RegisterForm