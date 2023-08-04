import React, { Component } from 'react';
import {
  Grid,
  Form,
  Header,
  Icon,
  Button,
} from 'semantic-ui-react';

export class NewMessageForm extends Component {
  render() {
    return (
      <div>
        <Grid style={{ height: '99vh' }}>
            <Grid.Row/>
            
            <Grid.Row verticalAlign='middle'>
                <Grid.Column width='7'/>

                <Grid.Column width='2'>
                  <Header
                    as='h2'
                    icon style={{color: 'white'}}
                    textAlign="center"
                  >
                    <Icon name='mail' circular />
                    <Header.Content>
                      New Message
                    </Header.Content>
                  </Header>
                </Grid.Column>

                <Grid.Column width='7' textAlign='center'>
                  <Button
                    icon='mail'
                    content='new'
                    color='blue'
                  />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Form>
                <Form.Input>
                </Form.Input>
              </Form>
            </Grid.Row>
        </Grid>
      </div>
    );
  };
};

export default NewMessageForm;
