'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useRef } from 'react';

type Props = LinkProps & {
  className?: string;
  shouldUnderlineOnHover?: boolean;
  text: string;
};
type LinkRef = HTMLAnchorElement;

function MenuLink(
  props: Props
) {
  const { className, href, text } = props;
  const pathname = usePathname();
  const linkRef = useRef<HTMLDivElement & LinkRef>(null);

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

export default React.forwardRef<
  React.Ref<HTMLDivElement> & React.Ref<LinkRef>,
  Props
>(MenuLink);
