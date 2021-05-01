import React from 'react';
import { useAmplitude } from './_app';

export default function Home(): JSX.Element {
  const amplitudeInstance = useAmplitude()?.ampInstance;

  amplitudeInstance && amplitudeInstance.logEvent('HOME_RENDER');
  return (
    <div>
      <img className="w-full h-auto" src="/public/images/baker-beach.jpg" />
    </div>
  );
}
