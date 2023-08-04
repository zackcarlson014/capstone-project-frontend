import React, { Component } from 'react';
import {
  Form,
  Button,
  Icon,
} from 'semantic-ui-react'

export class BookSearch extends Component {
  render() {
    return (
      <div>
        <Form onSubmit={this.props.searchBook}>
          <Form.Field>
            <input 
              style={{width: '400px'}} 
              type='text' 
              value={this.props.searchField} 
              onChange={this.props.handleSearch} 
              placeholder='Search Books...'
            />

            <Button 
              color='blue' 
              animated='fade' 
              icon={true} 
              type='submit'
            >
              <Button.Content visible>
                <Icon name='search'/>
              </Button.Content>

              <Button.Content hidden>
                Search
              </Button.Content>
            </Button>
          </Form.Field>
        </Form>
        
        <br/>
      </div>
    );
  }
};

export default BookSearch;