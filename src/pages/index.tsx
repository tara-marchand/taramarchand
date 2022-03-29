import Image from 'next/image';
import React from 'react';

import bakerBeach from '../public/images/baker-beach.jpg';

export default function Home(): JSX.Element {
  return (
    <div>
      <Image src={bakerBeach} alt="Baker Beach, San Francisco, CA" />
    </div>
  );
}
