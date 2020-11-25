import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

type Props = RouteComponentProps<any>;

const Footer: React.FC<Props> = () => {
  return (
    <footer className="print:hidden border-t border-gray-400 w-full">
      <div className="container px-3 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto flex items-center py-6">
        <a
          className="text-gray-500"
          href="https://twitter.com/trmarchand"
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a
          className="ml-3 text-gray-500"
          href="https://www.linkedin.com/in/trmarch/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path
              stroke="none"
              d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
            ></path>
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default withRouter(Footer);
