import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Header, Icon, Segment, Image } from 'semantic-ui-react'
import NavBar from './NavBar.js'
import DashboardLibraryBookCard from './DashboardLibraryBookCard'
import DashboardWishedBookCard from './DashboardWishedBookCard'


export class PublicProfile extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }
    
    userLibraryBooks = () => {
        return this.props.allLibBooks.filter(book => book[1].id === this.props.user.id)
    }

    userWishedBooks = () => {
        return this.props.allWishBooks.filter(book => book[1].id === this.props.user.id)
    }

    myLibraryBooks = () => {
        return this.props.allLibBooks.filter(book => book[1].id === this.props.auth.id)
    }

    myWishedBooks = () => {
        return this.props.allWishBooks.filter(book => book[1].id === this.props.auth.id)
    }




    render() {
        return (
            <div className='App'>
                <NavBar/>
                <br/><Grid>
                    <Grid.Row>
                        <Grid.Column width='1'></Grid.Column>
                        <Grid.Column width='8'><br/><Header as='h1' style={{color: 'white'}}>{this.props.user.username}</Header></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='1'></Grid.Column>
                        <Segment textAlign="center" compact><Image src={this.props.user.prof_pic_url} alt='' size='medium'/></Segment>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='1'></Grid.Column>
                        <Segment textAlign="center" compact>{this.props.user.bio}</Segment><br/><br/>
                    </Grid.Row>
                </Grid>
                <Header as='h3' icon style={{color: 'white'}} textAlign="center">
                        <Icon name='book' circular />
                        <Header.Content>{this.props.user.username}'s Library Books ({this.userLibraryBooks().length})</Header.Content>
                </Header><br/><br/> 
                <div>
                    <div className='ui eight centered cards'>
                        {this.userLibraryBooks().map((book, i) => {
                            if (this.myWishedBooks().find(b => b[0].id === book[0].id)) {
                                return <DashboardLibraryBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]} match={true} pub={true}/>
                            } else {
                                return <DashboardLibraryBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]} pub={true}/>
                            } 
                        })}
                    </div>
                </div><br/><br/><br/>
                <Header as='h3' icon style={{color: 'white'}} textAlign="center">
                        <Icon name='book' circular />
                        <Header.Content>{this.props.user.username}'s WishList Books ({this.userWishedBooks().length})</Header.Content>
                </Header><br/><br/>
                <div>
                    <div className='ui eight centered cards'>
                        {this.userWishedBooks().map((book, i) => {
                            if (this.myLibraryBooks().find(b => b[0].id === book[0].id)) {
                                return <DashboardWishedBookCard key={i} book={book[0]} user={book[1]} match={true}  pub={true}/>
                            } else {
                                return <DashboardWishedBookCard key={i} book={book[0]} user={book[1]}  pub={true}/>
                            }
                        })}
                    </div>
                </div><br/><br/><br/><br/>
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
        user: state.showUser,
        auth: state.auth,
        allLibBooks: state.allLibraryBooks,
        allWishBooks: state.allWishedBooks
    }
}

export default connect(mapStateToProps, null)(PublicProfile)