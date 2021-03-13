import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

type Props = LinkProps & {
  className?: string;
  shouldUnderlineWhenActive?: boolean;
  shouldUnderlineOnHover?: boolean;
  text: string;
};
type LinkRef = HTMLAnchorElement;

function MenuLink(
  {
    className = '',
    href,
    shouldUnderlineWhenActive = true,
    shouldUnderlineOnHover = true,
    text,
  }: Props,
  ref: React.Ref<HTMLDivElement> & React.Ref<LinkRef>
) {
  const router = useRouter();

  if (router.pathname === href) {
    const divClassName = `font-medium text-gray-900 ${className}`;
    return (
      <div className={divClassName} ref={ref}>
        {text}
      </div>
    );
  }

  let linkClassName = shouldUnderlineWhenActive
    ? `underline ${className}`
    : `${className}`;
  linkClassName = shouldUnderlineOnHover
    ? `hover:underline ${className}`
    : `${className}`;
  return (
    <Link href={href} passHref>
      <a className={linkClassName} href={href.toString()} ref={ref}>
        {text}
      </a>
    </Link>
  );
}

export default React.forwardRef<
  React.Ref<HTMLDivElement> & React.Ref<LinkRef>,
  Props
>(MenuLink);
