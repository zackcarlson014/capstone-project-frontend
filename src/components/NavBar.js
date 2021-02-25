import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/auth';
import { searchField } from '../actions/index';
import { Dropdown, Icon, Menu, Label, Input } from 'semantic-ui-react';

export class NavBar extends Component {

    state = { 
        activeItem: ''
    };

    handleSearch = (e) => {
        this.props.searchField(e.target.value);
    };

    handleLogout = () => {
        localStorage.removeItem('my_app_token');
        this.props.logoutUser();
    };

    newMessages = () => {
        return this.props.messages.filter(m =>
            m.recipient_id === this.props.auth.id 
            && 
            m.seen === false
        ).length;
    }; 
 

    // handleItemClick = (e, { name }) => {
    //   this.setState({
    //     activeItem: name
    //   })
    // }

    render() {
        const { activeItem } = this.state;
        const style = {
          position: "fixed",
            // width: "100%",
            zIndex: "999"
        };
        return (
            <Menu fluid inverted color='black' style={style}>
                <Menu.Item
                    header
                    as={Link}
                    to='/profile'
                    // name='home'
                    // active={activeItem === 'home'}
                    // onClick={this.handleItemClick}
                >
                    <Icon name='home' />MyBrary
                </Menu.Item>
                <Dropdown item icon='book' simple>
                    <Dropdown.Menu>
                        <Dropdown.Item as={ Link } to='/books'>Public Bookshelf</Dropdown.Item>
                        <Dropdown.Item as={ Link } to='/reserved_books'>My Reserved Books</Dropdown.Item>
                        <Dropdown.Item>
                            <Icon name='book' />
                            <span className='text'>Add</span>
                            <Dropdown.Menu>
                                <Dropdown.Item as={ Link } to='/user_lib_books/new'>Library Books</Dropdown.Item>
                                <Dropdown.Item as={ Link } to='/user_wish_books/new'>WishList Books</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item
                    header
                    as={Link}
                    to='/users'
                    // name='home'
                    // active={activeItem === 'home'}
                    // onClick={this.handleItemClick}
                >
                    <Icon name='user'/>
                </Menu.Item>
                <Menu.Item
                    header
                    as={Link}
                    to='/messages'
                    // name='home'
                    // active={activeItem === 'home'}
                    // onClick={this.handleItemClick}
                >
                    <Icon name='mail'/>
                    {this.props.messages && this.newMessages() !== 0  ?
                        <Label color='red' size='mini' circular={true} textAlign='center'>
                          {this.newMessages()}
                        </Label>
                        : 
                        null
                    }
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input style={{color: 'white'}} onChange={this.handleSearch} className='nav' transparent icon='search' placeholder='Search...' />
                    </Menu.Item>
                </Menu.Menu>
                {this.props.auth ? 
                    <Menu.Item
                        as={Link}
                        to='/login'
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={this.handleLogout}
                    >
                    Logout
                    </Menu.Item>
                    :
                    <Menu.Item
                        as={Link}
                        to='/login'
                        name='login'
                        active={activeItem === 'login'}
                        onClick={this.handleItemClick}
                    >
                    Login
                    </Menu.Item>
                }
            </Menu>
        );
    };
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        messages: state.allMessages
    };
};

export default connect(mapStateToProps, { searchField, logoutUser })(NavBar);