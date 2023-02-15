import React from 'react';
import Image from 'next/image';

import leaf from '../public/images/leaf.jpg';

export default function Home() {  
  return (
    <img alt="" className="block mx-auto my-0 max-h-full max-w-full" src={leaf.src} />
  );
}
