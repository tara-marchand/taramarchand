import React from 'react';
import Image from 'next/image';

import leaf from '../public/images/leaf.jpg';

export default function Home() {  
  return (
    <img alt="" className="block my-0 max-h-full" src={leaf.src} />
  );
}
