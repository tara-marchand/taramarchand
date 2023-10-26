import React from 'react';

import CbtForm from '../../src/CbtForm';

async function getData() {
  // const res = await fetch('https://payload.tmarchand.com/api/user');
  // if (!res.ok) {
  //   throw new Error('Failed to fetch data');
  // }
  // return res.json();
  return {};
}

export default async function Cbt() {
  const data = await getData();
  console.log(data);

  return <CbtForm />;
}
