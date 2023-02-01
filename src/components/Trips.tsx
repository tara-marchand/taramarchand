import React from 'react';
import { PrismaClient, Trip } from '@prisma/client';

export function getTrips() {
  return new Promise<Trip[]>(async (resolve, reject) => {

    const prisma = new PrismaClient();
    const trips = await prisma.trip.findMany();
    resolve(trips);
  });
}

export default async function Trips() {
  const trips = getTrips();
  
  console.log(trips);

  return <div>{trips?.map(trip => <div>{trip.name}</div>)}</div>;
};
