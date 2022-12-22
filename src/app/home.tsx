import React from 'react';
import Image from 'next/image';

import leaf from '../public/images/leaf.jpg';

export default function Home() {
  return (
    <div className="aspect-w-16 aspect-h-6">
      <Image
        src={leaf}
        alt=""
        fill
        placeholder="blur"
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}
