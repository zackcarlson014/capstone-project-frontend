import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { showUser } from '../actions/index.js'
import  Carousel  from  'semantic-ui-carousel-react';
import { Image, Button, Icon, Header } from  'semantic-ui-react'

export class UserCarousel extends Component {
    
    state  = {elements: this.props.users.map(u => {
        return {render: () => {
            return (
                <div>
                    <Header as='h4' textAlign='center' color='green'><Icon name='user'/>Library Users</Header>
                    <Image src={u[1].prof_pic_url} alt='' size='medium'/><br/><br/>
                    <Button as={ Link } exact to={`/users/${u[1].id}`} fluid animated='fade' icon='user' color='green' onClick={this.handleShowUser(u[1])}>
                            <Button.Content visible><Icon name='user'/></Button.Content>
                            <Button.Content hidden>{u[1].username}'s Profile</Button.Content>
                    </Button>
                    {this.props.users.length !== 1 ? <br/> : null}
                </div>
            );
          }
        }
    })}

    handleShowUser = (user) => {
        this.props.showUser(user)
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <Carousel
                    elements  =  {  this.state.elements  }
                    duration  ={this.props.users.length !== 1 ? 10000 : null}
                    animation  ='slide left'
                    showNextPrev  =  {false}
                    showIndicators  = {this.props.users.length !== 1 ? true : false}
                />
            </div>
        )
    
    }
}

export default connect(null, { showUser })(UserCarousel);