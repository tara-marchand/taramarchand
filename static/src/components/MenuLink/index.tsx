import * as React from 'react';
import { NavLink, Route, NavLinkProps } from 'react-router-dom';

interface Props extends NavLinkProps {}

const MenuLink: React.FC<Props> = (props: Props) => {
  const {
    activeClassName,
    activeStyle,
    className,
    exact,
    isActive: getIsActive,
    location,
    strict,
    style,
    to,
    ...rest
  } = props;

  let path = '';
  switch (typeof to) {
    case 'string':
      path = to;
      break;
    case 'object':
      path = to.pathname;
      break;
    case 'function':
      const loc = to(location);
      path = typeof loc === 'object' ? loc.pathname : loc;
      break;
    default:
      break;
  }

  return (
    <Route
      path={path}
      exact={exact}
      strict={strict}
      children={({ location, match }) => {
        const isActive = !!(getIsActive ? getIsActive(match, location) : match);
        return (
          <li
            className={
              isActive ? [activeClassName, className].join(' ') : className
            }
            style={isActive ? { ...style, ...activeStyle } : style}
          >
            <NavLink to={to} {...rest} />
          </li>
        );
      }}
    />
  );
};
export default MenuLink;
