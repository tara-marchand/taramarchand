'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import React, { createRef } from 'react';

type Props = LinkProps & {
  className?: string;
  shouldUnderlineOnHover?: boolean;
  ref: LinkRef;
  text: string;
};

type LinkRef = HTMLAnchorElement & HTMLDivElement;

export default function MenuLink(
  props: Props
) {
  const { className, href, text } = props;
  const pathname = usePathname();
  const linkRef = createRef<LinkRef>(); // useRef<HTMLDivElement & LinkRef>(null);

  // active
  if (pathname === href) {
    return (
      <div className={`font-heavy ${className}`} ref={linkRef}>
        {text}
      </div>
    );
  }

  return (
    <Link legacyBehavior href={href} passHref>
      <a className={className} href={href.toString()} ref={linkRef}>
        {text}
      </a>
    </Link>
  );
}
