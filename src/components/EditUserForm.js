import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateUser } from '../actions/auth.js'
import { Button, Form, Grid, Header, Segment, Message, Image } from 'semantic-ui-react'


export class EditUserForm extends Component {

    state = {
        username: this.props.auth.username,
        image: this.props.auth.prof_pic_url,
        bio: this.props.auth.bio
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {

        const editUser = {
            username: this.state.username,
            prof_pic_url: this.state.image,
            bio: this.state.bio
        }

        const reqObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(editUser)
        }
        
        fetch(`http://localhost:3000/api/v1/users/${this.props.auth.id}`, reqObj)
        .then(resp => resp.json())
        .then(user => {
            this.props.updateUser(user)
            this.props.history.push('/profile')
        })   
    }

    render() {
        return (
            <div className='App'>
                {this.state.error ? <div><br/><br/><h4 style={{color: 'red'}}>{this.state.error}</h4></div> : null}
                <Grid textAlign='center' style={{ height: '110vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 600 }}>
                        <Header as='h1'  style={{color: 'white'}} textAlign='center'>
                            <Header.Content>Edit Your Account!!</Header.Content>
                        </Header>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                            <Form.Input onChange={this.handleInputChange} icon='user' name='username' value={this.state.username} iconPosition='left' placeholder='Username' />
                            <Image src={this.state.image} alt='' width='100px'/>
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
                                labelposition='left'
                                value={this.state.bio}
                            />
                            <Button type='submit' color='green' fluid size='large'>
                                Update
                            </Button>
                            </Segment>
                        </Form>
                        <Message>
                            <Button as={ Link } exact to={`/profile`} fluid color='red' size='mini'>Cancel</Button>
                        </Message>
                    </Grid.Column>
                </Grid>
                <div className="ui inverted vertical footer segment form-page">
                    <div className="ui container">
                        MyBrary
                    </div>
                </div>
          </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { updateUser })(EditUserForm)