import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Footer from '../Footer'
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
  Icon,
  Image
} from 'semantic-ui-react'


export class NewUserForm extends Component {
  state = {
      username: '',
      password:'',
      image: '',
      bio: ''
  };

  handleInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      });
  };

  handleSubmit = () => {
      const newUser = {
          username: this.state.username,
          password: this.state.password,
          prof_pic_url: this.state.image,
          bio: this.state.bio
      };
      const reqObj = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify(newUser)
      };
      fetch('http://localhost:3000/api/v1/users', reqObj)
      .then(resp => resp.json())
      .then(user => {
          this.props.history.push('/login');
      }); 
  };

  render() {
    return (
      <div className='App'>
        {!this.state.error
          ? null
          : <div>
              <br/><br/>
              <h4 style={{color: 'red'}}>
                {this.state.error}
              </h4>
            </div>
        }

        <Grid
          textAlign='center'
          style={{ height: '110vh' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 600 }}>
            <Header
              as='h2'
              icon
              style={{color: 'white'}}
              textAlign='center'
            >
              <Icon name='book' circular />
              <Header.Content>
                Create an Account!!
              </Header.Content>
            </Header>

            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  icon='user'
                  name='username'
                  value={this.state.username}
                  iconPosition='left'
                  placeholder='Username'
                  onChange={this.handleInputChange}
                />

                <Form.Input
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  name='password'
                  value={this.state.password}
                  type='password'
                  onChange={this.handleInputChange}
                />

                <Image
                  src={this.state.image}
                  alt=''
                  width='100px'
                />

                <Form.Input
                  icon='camera'
                  iconPosition='left'
                  placeholder='Profile Picture URL'
                  name='image'
                  value={this.state.image}
                  onChange={this.handleInputChange}
                />
                
                <br/>

                <Form.TextArea
                  placeholder='About Me...'
                  name='bio'
                  label='User Bio'
                  labelposition='left'
                  value={this.state.bio}
                  type='password'
                  onChange={this.handleInputChange}
                />

                <Button
                  type='submit'
                  color='green'
                  fluid
                  size='large'
                >
                  Create Account
                </Button>
              </Segment>
            </Form>

            <Message>
              Already have an account?
              <Button
                as={ Link }
                exact='true'
                to={`/login`}
                color='blue'
                size='mini'
              >
                Login
              </Button>
            </Message>
          </Grid.Column>
        </Grid>

        <Footer/>
      </div>
    );
  };
};

export default connect()(NewUserForm);