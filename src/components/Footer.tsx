import * as React from 'react';
import { LinkedInIcon } from './LinkedInIcon';
import { TwitterIcon } from './TwitterIcon';

const Footer: React.FunctionComponent = () => {
  return (
    <footer className="bg-gray-400 p-6 max-w-full">
      <div className="flex px-6 md:px-0 max-w-screen-md mx-auto">
        <a
          className="mr-6"
          href="https://twitter.com/trmarchand"
          rel="noopener noreferrer"
          target="_blank"
        >
          <TwitterIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/trmarch/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <LinkedInIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
