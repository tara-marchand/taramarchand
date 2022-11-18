import * as React from 'react';

import { GithubFilled, LinkedinFilled, MailFilled, TwitterCircleFilled } from '@ant-design/icons';

const Footer: React.FunctionComponent = () => {
  return (
    <footer className="max-w-full bg-gray-400 p-6">
      <div className="mx-auto flex max-w-screen-md px-6 md:px-0">
        <a href="#" onClick={openEmail} className="mr-6">
          <MailFilled className="text-3xl" />
        </a>
        <a
          className="mr-6"
          href="https://www.linkedin.com/in/trmarch/"
          rel="noopener noreferrer"
          target="_blank"
          title="LinkedIn"
        >
          <LinkedinFilled className="text-3xl" />
        </a>
        <a
          className="mr-6"
          href="https://github.com/tara-marchand"
          rel="noopener noreferrer"
          target="_blank"
        >
          <GithubFilled className="text-3xl" />
        </a>
        <a
          className="mr-6"
          href="https://twitter.com/trmarchand"
          rel="noopener noreferrer"
          target="_blank"
        >
          <TwitterCircleFilled className="text-3xl" />
        </a>
      </div>
    </footer>
  );
};

function openEmail(e: React.MouseEvent) {
  e.preventDefault();

  const name = 'tara';
  const at = '@';
  const domain = 'mac';
  const dot = '.';
  const tld = 'com';
  const address = name + at + domain + dot + tld;

  location.href = 'mailto:' + address;
}

export default Footer;
