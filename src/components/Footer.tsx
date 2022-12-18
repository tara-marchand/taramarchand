import * as React from 'react';

const Footer: React.FunctionComponent = () => {
  return (
    <footer className="max-w-full bg-gray-400 p-6">
      <div className="mx-auto flex max-w-screen-md px-6 md:px-0">
        <a href="#" onClick={openEmail} className="mr-6">
          Email
        </a>
        <a
          className="mr-6"
          href="https://www.linkedin.com/in/trmarch/"
        >
          LinkedIn
        </a>
        <a
          className="mr-6"
          href="https://github.com/tara-marchand"
        >
          GitHub
        </a>
        <a
          rel="me"
          className="mr-6"
          href="https://sfba.social/@trmarchand"
        >
          Mastodon
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
