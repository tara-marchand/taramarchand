import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

type Props = RouteComponentProps<any>;

class Footer extends React.PureComponent<Props> {
  render() {
    return (
      <div className="Footer bg-gray-300 flex items-center h-12 w-full">
        <ul className="container flex items-center mx-auto pl-4 pr-4 sm:p-0">
          <li className="mr-2 pr-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/trmarch/"
            >
              LinkedIn
            </a>
          </li>
          <li className="mr-2 pl-2 pr-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/tara-marchand"
            >
              GitHub
            </a>
          </li>
          <li className="mr-2 pl-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/trmarchand"
            >
              Twitter
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(Footer);
