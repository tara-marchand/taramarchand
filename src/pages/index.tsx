import Image from 'next/image';
import React from 'react';

import purple from '../public/images/purple.jpg';

export default function Home(): JSX.Element {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <Image
        src={purple}
        alt=""
        fill
        placeholder="blur"
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}
