import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { showBook, showUser } from '../actions/index.js'
import NavBar from './NavBar.js'
import ReservedMessages from './ReservedMessages.js'
import { Grid , Header, Segment, Image, Button} from 'semantic-ui-react'

export class ReservedBookShowPage extends Component {

    handleShowUser = () => {
        this.props.showUser(this.props.book[1])
    }

    render() {
        return (
            <div className='App'>
                <NavBar/>
                <br/><Grid>
                    <Grid.Row>
                        <Grid.Column width='2'></Grid.Column>
                        <Grid.Column width='2'><br/><br/><Button fluid color='blue'>Reserved Books</Button></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2'></Grid.Column>
                        <Grid.Column width='8'><br/><Header as='h1' style={{color: 'white'}}>{this.props.book[0].title}</Header></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2'></Grid.Column>
                        <Grid.Column width='6'><br/><Segment compact><Image src={this.props.book[0].image} alt='' width='245px' height='350px'/></Segment><br/></Grid.Column>
                        <Grid.Column width='6'>
                        <br/><Segment compact>
                                <Image src={this.props.book[1].prof_pic_url} alt='' size='medium'/><br/>
                                <Button as={ Link } exact to={`/users/${this.props.book[1].id}`} fluid color='green' onClick={this.handleShowUser}>{this.props.book[1].username}'s Profile</Button>
                            </Segment><br/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2'></Grid.Column>
                        <Grid.Column width='5'><Header as='h3' style={{color: 'white'}}><strong>{this.props.book[0].author}</strong></Header></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2'></Grid.Column>
                        <Grid.Column width='2'><Button color='green'>Delivered</Button></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2'></Grid.Column>
                        <Grid.Column width='11'>
                            <Segment>
                                <ReservedMessages/>
                            </Segment><br/><br/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2'></Grid.Column>
                        <Grid.Column width='2'><br/><Button fluid color='blue'>Reserved Books</Button></Grid.Column>
                    </Grid.Row>
                </Grid><br/><br/>
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
        book: state.showBook
    }
}

export default connect(mapStateToProps, { showBook, showUser })(ReservedBookShowPage)
