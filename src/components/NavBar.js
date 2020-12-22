import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../actions/auth'
import { Dropdown, Icon, Segment, Menu } from 'semantic-ui-react'

export class NavBar extends Component {
  state = { 
    activeItem: ''
  }

  handleLogout = () => {
    localStorage.removeItem('my_app_token')
    this.props.logoutUser()
  }

  handleItemClick = (e, { name }) => {
    this.setState({
      activeItem: name
    })
  }

  render() {
    const { activeItem } = this.state
    const style = {
      position: "fixed",
        width: "100%",
        zIndex: "999"
    }

    return (
      <Menu inverted color='black' style={style}>
          <Dropdown item icon='home' simple>
            <Dropdown.Menu>
            <Dropdown.Item>
                <Icon name='book' />
                <span className='text'>New</span>

                <Dropdown.Menu>
                <Dropdown.Item>Library Books</Dropdown.Item>
                <Dropdown.Item>WishList Books</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>All Books</Dropdown.Item>
            <Dropdown.Item>Save...</Dropdown.Item>
            <Dropdown.Item>Edit Permissions</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Export</Dropdown.Header>
            <Dropdown.Item>Share</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <Menu.Item
          as={NavLink}
          to='/profile'
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          as={NavLink}
          to='/books'
          name='books'
          active={activeItem === 'books'}
          onClick={this.handleItemClick}
        >
          All Books
        </Menu.Item>
        {
            this.props.auth ? 
            <Menu.Item
            position='right'
            as={NavLink}
            to='/login'
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleLogout}
            >
            Logout
            </Menu.Item>
            :
            <Menu.Item
            as={NavLink}
            to='/login'
            name='login'
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
            >
            Login
            </Menu.Item>

        }

        {/* <Menu.Menu position='right'>
        <div className='ui right aligned category search item'>
          <div className='ui transparent icon input'>
            <input
              className='prompt'
              textColor='white'
              type='text'
              placeholder='Search Notes...'
            />
            <i className='search link icon' />
          </div>
          <div className='results' />
        </div>
      </Menu.Menu> */}
      </Menu>
    )
  }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logoutUser })(NavBar)