import React from 'react';

export default function Home() {
  return (
    <div
      className="pr-4 pl-4 bg-no-repeat bg-cover bg-center min-h-full w-full"
      style={{
        backgroundImage: 'url(/static/images/baker-beach.jpg)',
        minHeight: '75vh',
      }}
    ></div>
  );
}
