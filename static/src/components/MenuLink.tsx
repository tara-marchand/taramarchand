import * as React from 'react';
import { NavLink, Route, NavLinkProps } from 'react-router-dom';

interface Props extends NavLinkProps {
  text: string;
}

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
    text,
    to,
    ...rest
  } = props;

  let path = '';
  switch (typeof to) {
    case 'string':
      path = to;
      break;
    case 'object':
      path = to.pathname || '';
      break;
    case 'function':
      if (location) {
        const loc = to(location);

        if (typeof loc === 'object' && loc.pathname) {
          path = loc.pathname;
        } else if (typeof loc === 'string') {
          path = loc;
        }
      }
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
        let isActive = false;
        if (match) {
          isActive = !!(getIsActive ? getIsActive(match, location) : match);
        }

        return (
          <li
            className={
              isActive
                ? [activeClassName, className, 'text-primary'].join(' ')
                : className
            }
            style={isActive ? { ...style, ...activeStyle } : style}
          >
            {!isActive ? (
              <NavLink to={to} {...rest}>
                {text}
              </NavLink>
            ) : (
              <span>{text}</span>
            )}
          </li>
        );
      }}
    />
  );
};
export default MenuLink;
