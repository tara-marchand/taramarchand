import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Icon, Menu } from 'semantic-ui-react';

class Footer extends PureComponent {
  render() {
    return (
      <Menu borderless color="grey" inverted>
        <Menu.Item
          link
          target="_blank"
          href="https://www.linkedin.com/in/trmarch/"
        >
          <Icon name="linkedin square" />LinkedIn
        </Menu.Item>
        <Menu.Item link target="_blank" href="https://github.com/tara-marchand">
          <Icon name="github square" />GitHub
        </Menu.Item>
        <Menu.Item link target="_blank" href="https://twitter.com/trmarchand">
          <Icon name="twitter square" />Twitter
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Footer);
