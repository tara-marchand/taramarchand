import { Trip } from '@prisma/client';
import React from 'react';

import { Trips } from '../../components/Trips';

interface ServerSideProps {
  trips?: Trip[];
}

export default function Prisma(props: ServerSideProps) {
  return <Trips />;
}
