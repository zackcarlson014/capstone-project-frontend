import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { showBook } from '../actions/index.js'
import  Carousel  from  'semantic-ui-carousel-react';
import { Grid, Header, Image, Button, Icon } from  'semantic-ui-react'

export class CurrentlyReadingCarousel extends Component {

    handleShowBook = (book) => {
        this.props.showBook(book, this.props.auth)
    }
    
    state  = {elements: this.props.books.map(b => {
        return {render: () => {
            return (
                <Grid.Column width='2'>
                <Header textAlign='center'><Icon name='book'/>Currently Reading</Header>
                    <Image src={b.image} alt='' fluid/><br/><br/>
                    <Button.Group widths='2'>
                    <Button as={ Link } exact to={`/books/${b.id}`} fluid animated='fade' icon='eye' color='blue' onClick={() => this.handleShowBook(b)}>
                            <Button.Content visible><Icon name='eye'/></Button.Content>
                            <Button.Content hidden>View</Button.Content>
                    </Button>
                    <Button as={ Link } exact to={`/books/${b.id}`} fluid animated='fade' icon='book' color='green' onClick={() => this.handleShowBook(b)}>
                            <Button.Content visible><Icon name='book'/></Button.Content>
                            <Button.Content hidden>Add To Library</Button.Content>
                    </Button>
                    </Button.Group>
                    {this.props.books.length !== 1 ? <br/> : null}
                </Grid.Column>
            );
          }
        }
    })}

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <Carousel
                    elements  =  {  this.state.elements  }
                    duration  ={this.props.books.length !== 1 ? 10000 : null}
                    animation  ='slide left'
                    showNextPrev  =  {false}
                    showIndicators  = {this.props.books.length !== 1 ? true : false}
                />
            </div>
        )
    
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { showBook })(CurrentlyReadingCarousel);