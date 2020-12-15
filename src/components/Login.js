import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginSuccess } from '../actions/auth'

export class Login extends Component {

    state = {
        username: '',
        password: '',
        error: null
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }

        fetch('http://localhost:3000/api/v1/auth', reqObj)
        .then(resp => resp.json())
        .then(data => {
            if (data.error) {
                this.setState({
                    error: data.error
                })
            } else {
                this.props.loginSuccess(data)
            }
        })

        // send form data to backend so user is authenticated
        // once successful:
        //  -reset form
        //  -redirect to the profile
        //  -update the redux store with user
    }

    render() {
        return (
            <div>
                {this.state.error ? <h4 style={{color: 'red'}}>{this.state.error}</h4> : null}
                <h3>Sign In</h3>
                <form onSubmit={this.handleSubmit}>
                    <input name={'username'} onChange={this.handleInputChange} value={this.state.username} placeholder='Enter username...'/>
                    <input type='password' name={'password'} onChange={this.handleInputChange} value={this.state.password} placeholder='Enter password...'/>
                    <input type='submit' value='login'/>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    loginSuccess
}

export default connect(null, mapDispatchToProps)(Login)
