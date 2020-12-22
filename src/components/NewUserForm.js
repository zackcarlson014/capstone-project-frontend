import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'


export class NewUserForm extends Component {

    state = {
        username: '',
        password:'',
        image: '',
        bio: ''
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {

        const newUser = {
            username: this.state.username,
            password: this.state.password,
            prof_pic_url: this.state.image,
            bio: this.state.bio
        }

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newUser)
        }
        
        fetch('http://localhost:3000/api/v1/users', reqObj)
        .then(resp => resp.json())
        .then(user => {
            console.log(user)
            this.props.history.push('/login')
        })
        
    }

    render() {
        return (
            // <div className='App'>
            <div class='App'>
                {this.state.error ? <div><br/><br/><h4 style={{color: 'red'}}>{this.state.error}</h4></div> : null}
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 600 }}>
                        <Header as='h2' color='green' style={{backgroundColor: 'white'}} textAlign='center'>
                            Create a New Account!!
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
                           <Form.Input
                                onChange={this.handleInputChange}
                                icon='camera'
                                iconPosition='left'
                                placeholder='Profile Picture URL'
                                name='image'
                                value={this.state.image}
                            /><br/>
                            <Form.TextArea
                                onChange={this.handleInputChange}
                                placeholder='About Me...'
                                name='bio'
                                label='User Bio'
                                labelPosition='left'
                                value={this.state.bio}
                                type='password'
                            />
                            <Button type='submit' color='green' fluid size='large'>
                                Create Account
                            </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
          </div>
        )
    }
}

export default connect()(NewUserForm)