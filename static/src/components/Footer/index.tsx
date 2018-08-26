import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

type Props = RouteComponentProps<any>;

class Footer extends React.PureComponent<Props> {
  render() {
    return (
        <ul className="Footer menu align-center">
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/trmarch/"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/tara-marchand"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/trmarchand"
            >
              Twitter
            </a>
          </li>
        </ul>
    );
  }
}

export default withRouter(Footer);
