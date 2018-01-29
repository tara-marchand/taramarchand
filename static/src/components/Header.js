import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
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
        <MenuLink as={NavLink} to="/" exact>
          Tara Marchand
        </MenuLink>
        <MenuLink as={NavLink} to="/resume" exact>
          Resume
        </MenuLink>
      </Menu>
    )
  }

  handleItemClick(e, itemProps) {
    if (itemProps.index === activeIndex) {
      e.preventDefault()
    }
  }
}

export default Header
