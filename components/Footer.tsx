import * as React from 'react';

const Footer: React.FunctionComponent = () => {
  return (
    <footer className="bg-gray-400 p-6 prose prose-m max-w-full">
      <div className="flex max-w-prose mx-auto">
        <a
          className="mr-6"
          href="https://twitter.com/trmarchand"
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg
            fill="currentColor"
            height="30px"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/trmarch/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg
            fill="currentColor"
            height="30px"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0"
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

export default Footer;
