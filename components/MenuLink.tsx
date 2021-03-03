import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

type Props = LinkProps & {
  className?: string;
  text: string;
};
type LinkRef = HTMLAnchorElement;

function MenuLink(props: Props, ref: React.Ref<LinkRef>) {
  const router = useRouter();

  let className = props.className || '';
  if (router.pathname === props.href) {
    className = `${className} selected`;
  }

  return (
    <Link href={props.href} passHref>
      <a className={className} href={props.href.toString()} ref={ref}>
        {props.text}
      </a>
    </Link>
  );
}

export default React.forwardRef<LinkRef, Props>(MenuLink);
