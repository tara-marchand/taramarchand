import * as React from 'react';
import { LinkedInIcon } from './LinkedInIcon';
import { TwitterIcon } from './TwitterIcon';
import { SocialIcon } from 'react-social-icons';

const Footer: React.FunctionComponent = () => {
  return (
    <footer className="max-w-full bg-gray-400 p-6">
      <div className="mx-auto flex max-w-screen-md px-6 md:px-0">
        <SocialIcon
          className="mr-6"
          url="https://twitter.com/trmarchand"
          rel="noopener noreferrer"
          target="_blank"
        />
        <SocialIcon
          url="https://www.linkedin.com/in/trmarch/"
          rel="noopener noreferrer"
          target="_blank"
        />
      </div>
    </footer>
  );
};

export default Footer;
