import * as React from 'react';
import { NavLink, NavLinkProps, Route } from 'react-router-dom';

interface Props extends NavLinkProps {
  linkClassName?: string;
  text: string;
}

export default function MenuLink(props: Props) {
  const {
    activeClassName,
    activeStyle,
    className,
    exact,
    linkClassName,
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
          <div
            className={
              isActive ? [activeClassName, className].join(' ') : className
            }
            style={isActive ? { ...style, ...activeStyle } : style}
          >
            {!isActive ? (
              <NavLink to={to} {...rest} className={linkClassName}>
                {text}
              </NavLink>
            ) : (
              <>{text}</>
            )}
          </div>
        );
      }}
    />
  );
}
