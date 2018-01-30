import React from 'react'
import { Menu } from 'semantic-ui-react'

class Footer extends React.Component {
  render() {
    return (
      <Menu borderless>
        <Menu.Item>
          <a
            href="https://www.linkedin.com/in/trmarch/"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            href="https://github.com/tara-marchand"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            href="https://twitter.com/trmarchand"
            rel="noopener noreferrer"
            target="_blank"
          >
            Twitter
          </a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default Footer
