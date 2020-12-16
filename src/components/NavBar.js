import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

export class NavBar extends Component {
  state = { 
    activeItem: ''
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
        <Menu.Item
          as={NavLink}
          to='/profile'
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>
        {
            this.props.auth ? 
            <Menu.Item
            as={NavLink}
            to='/login'
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
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

export default connect(mapStateToProps, null)(NavBar)