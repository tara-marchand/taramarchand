import Image from 'next/image';
import React from 'react';

import { useAmplitude } from './_app';

import bakerBeach from '../public/images/baker-beach.jpg';

export default function Home(): JSX.Element {
  const amplitudeInstance = useAmplitude()?.ampInstance;

  amplitudeInstance && amplitudeInstance.logEvent('HOME_RENDER');
  return (
    <div>
      <Image src={bakerBeach} alt="Baker Beach, San Francisco, CA" />
    </div>
  );
}
