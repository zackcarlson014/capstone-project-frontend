import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginSuccess } from '../actions/auth'
// import NavBar from './NavBar.js'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'

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
            console.log(data)
            if (data.error) {
                this.setState({
                    error: data.error
                })
            } else {
                this.props.loginSuccess(data)
                this.props.history.push('/profile')
                localStorage.setItem('my_app_token', data.token)
            }
        })
    }

    render() {
        return (
            <div class='App'>
                {/* <NavBar /> */}
                {this.state.error ? <div><br/><br/><h4 style={{color: 'red'}}>{this.state.error}</h4></div> : null}
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='blue' style={{backgroundColor: 'white'}} textAlign='center'>
                            Log-in to your account
                        </Header>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                            <Form.Input onChange={this.handleInputChange} icon='user' name='username' value={this.state.username} iconPosition='left' placeholder='Username' />
                            <Form.Input
                                onChange={this.handleInputChange}
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                name='password'
                                value={this.state.password}
                                type='password'
                            />

                            <Button color='blue' fluid size='large'>
                                Login
                            </Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <a href='#'>Sign Up</a>
                        </Message>
                    </Grid.Column>
                </Grid>
                {/* <br/><br/><h3>Sign In</h3>
                <form onSubmit={this.handleSubmit}>
                    <input name={'username'} onChange={this.handleInputChange} value={this.state.username} placeholder='Enter username...'/>
                    <input type='password' name={'password'} onChange={this.handleInputChange} value={this.state.password} placeholder='Enter password...'/>
                    <input type='submit' value='login'/>
                </form> */}
            </div>
        )
    }
}

const mapDispatchToProps = {
    loginSuccess
}

export default connect(null, mapDispatchToProps)(Login)
