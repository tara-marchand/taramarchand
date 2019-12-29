import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

type Props = RouteComponentProps<any>;

const Footer: React.FC<Props> = () => {
  return (
    <footer className="bg-indigo-300 pt-2 pb-2 pl-4 pr-4">
      <ul className="flex flex-row pb-4 pt-4">
        <li className="block mr-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/trmarch/"
          >
            LinkedIn
          </a>
        </li>
        <li className="block mr-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/tara-marchand"
          >
            GitHub
          </a>
        </li>
        <li className="block">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/trmarchand"
          >
            Twitter
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default withRouter(Footer);
