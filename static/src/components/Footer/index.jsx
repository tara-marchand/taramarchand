import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { List } from 'semantic-ui-react';

class Footer extends PureComponent {
  render() {
    return (
      <List horizontal inverted>
        <List.Item
          as="a"
          target="_blank"
          href="https://www.linkedin.com/in/trmarch/"
        >
          <List.Content>LinkedIn</List.Content>
        </List.Item>
        <List.Item
          as="a"
          target="_blank"
          href="https://github.com/tara-marchand"
        >
          <List.Content>GitHub</List.Content>
        </List.Item>
        <List.Item as="a" target="_blank" href="https://twitter.com/trmarchand">
          <List.Content>Twitter</List.Content>
        </List.Item>
      </List>
    );
  }
}

export default withRouter(Footer);
