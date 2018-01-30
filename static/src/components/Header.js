import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const MenuLink = styled(Menu.Item)`
  &.active {
    cursor: default;
  }
`

class Header extends PureComponent {
  render() {
    return (
      <Menu>
        <MenuLink as={NavLink} isActive={() => false} to="/">
          Tara Marchand
        </MenuLink>
        <MenuLink as={NavLink} exact to="/resume">
          Resume
        </MenuLink>
      </Menu>
    )
  }
}

export default Header
