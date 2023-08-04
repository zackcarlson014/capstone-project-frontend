import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateUser } from '../../actions/auth'
import Footer from '../Footer'
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
  Image
} from 'semantic-ui-react'


export class EditUserForm extends Component {
  state = {
    username: this.props.auth.username,
    image: this.props.auth.prof_pic_url,
    bio: this.props.auth.bio,
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = () => {
    const editUser = {
      username: this.state.username,
      prof_pic_url: this.state.image,
      bio: this.state.bio,
    };

    const reqURL = `http://localhost:3000/api/v1/users/${this.props.auth.id}`;

    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(editUser),
    };

    fetch(reqURL, reqObj)
    .then(resp => resp.json())
    .then(user => {
      this.props.updateUser(user);
      this.props.history.push('/profile');
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
              as='h1'
              style={{color: 'white'}}
              textAlign='center'
            >
              <Header.Content>
                Edit Your Account!!
              </Header.Content>
            </Header>

            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  value={this.state.username}
                  icon='user'
                  name='username'
                  iconPosition='left'
                  placeholder='Username'
                  onChange={this.handleInputChange}
                />

                <Image
                  src={this.state.image}
                  alt=''
                  width='100px'
                />

                <Form.Input
                  value={this.state.image}
                  icon='camera'
                  iconPosition='left'
                  placeholder='Profile Picture URL'
                  name='image'
                  onChange={this.handleInputChange}
                />
                
                <br/>

                <Form.TextArea
                  value={this.state.bio}
                  placeholder='About Me...'
                  name='bio'
                  label='User Bio'
                  labelposition='left'
                  onChange={this.handleInputChange}
                />

                <Button
                  type='submit'
                  color='green'
                  fluid
                  size='large'
                >
                    Update
                </Button>
              </Segment>
            </Form>

            <Message>
              <Button
                as={ Link }
                exact='true'
                to={`/profile`}
                fluid
                color='red'
                size='mini'>
                Cancel
              </Button>
            </Message>
          </Grid.Column>
        </Grid>
        <Footer/>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(
  mapStateToProps,
  {
    updateUser,
  },
)(EditUserForm);