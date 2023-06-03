import Link from 'next/link';
import React from 'react';

export function Header() {
  return (
    <header aria-label="Site header" className="bg-gray-200">
      <div className="mx-auto flex items-center gap-8 p-6">
        <Link className="block text-3xl no-underline" href="/">
          <span>Tara Marchand</span>
        </Link>
        <div className="flex flex-1 items-center justify-end">
          <nav aria-label="Site nav" className="block">
            <ul className="flex items-center gap-6 list-none m-0 p-0">
              <li>
                <Link href="/resume">Resume</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
