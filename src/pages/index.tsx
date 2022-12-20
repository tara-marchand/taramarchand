import Image from 'next/image';
import React from 'react';

import purple from '../public/images/purple.jpg';

export default function Home(): JSX.Element {
  return (
    <div className="container">
      <Image src={purple} alt="" fill />
    </div>
  );
}
