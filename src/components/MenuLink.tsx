import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

type Props = LinkProps & {
  className?: string;
  shouldUnderlineOnHover?: boolean;
  text: string;
};
type LinkRef = HTMLAnchorElement;

function MenuLink(
  { className = '', href, text }: Props,
  ref: React.Ref<HTMLDivElement> & React.Ref<LinkRef>
) {
  const router = useRouter();

  // active
  if (router.pathname === href) {
    return (
      <div className={`font-heavy ${className}`} ref={ref}>
        {text}
      </div>
    );
  }

  return (
    <Link href={href} passHref>
      <a className={className} href={href.toString()} ref={ref}>
        {text}
      </a>
    </Link>
  );
}

export default React.forwardRef<
  React.Ref<HTMLDivElement> & React.Ref<LinkRef>,
  Props
>(MenuLink);
