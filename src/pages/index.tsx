import Image from 'next/image';
import React from 'react';

import bakerBeach from '../public/images/baker-beach.jpg';

export default function Home(): JSX.Element {
  return (
    <div className="relative h-full">
      <Image style={{objectFit: 'cover', width: '100%'}} src={bakerBeach} alt="Baker Beach, San Francisco, CA" />
    </div>
  );
}
