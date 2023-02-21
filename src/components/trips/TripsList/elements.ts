import { v4 as uuidv4 } from 'uuid';

import { Trip } from './types';

export const trip: Trip = {
  id: uuidv4(),
  name: 'Summer 2023 Europe',
  startTimestamp: 1688169600000,
  endTimestamp: 1688774399999,
  tripLegs: [
    {
      startTimestamp: 1688169600000,
      // endTimestamp: 1688169600000,
      from: {
        name: 'London',
        country: 'United Kingdom',
      },
      to: {
        name: 'Paris',
        country: 'France',
      },
    },
    {
      // startTimestamp: 1688169600000,
      endTimestamp: 1688169600000,
      from: {
        name: 'Paris',
        country: 'France',
      },
      to: {
        name: 'Berlin',
        country: 'Germany',
      },
    },
  ],
};
