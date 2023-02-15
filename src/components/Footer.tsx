'use client';

import * as React from 'react';

export function Footer() {
  return (
    <footer aria-label="Site footer" className="bg-gray-400">
        <div className="mx-auto p-6">
          <nav aria-label="Footer nav">
            <ul className="flex flex-wrap justify-left gap-6 list-none m-0 p-0">
              <li><a href="#" onClick={openEmail}>Email</a> </li>
              <li><a href="https://www.linkedin.com/in/trmarch/" target="_blank" rel="noreferrer">LinkedIn</a> </li>
              <li><a href="https://github.com/tara-marchand" target="_blank" rel="noreferrer">GitHub</a></li> 
              <li><a href="https://sfba.social/@trmarchand" target="_blank" rel="me">Mastodon</a></li>
            </ul>
          </nav>
        </div>
    </footer>
  )
}

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
