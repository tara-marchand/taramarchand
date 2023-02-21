export type Trip = {
  id: string;
  name: string;
  tripLegs?: TripLeg[];
  startTimestamp: number; // first trip leg's start must equal trip start
  endTimestamp: number; // last trip leg's start must equal trip end
}

export type TripLeg = {
  from: City;
  to: City;
  startTimestamp?: number;
  endTimestamp?: number;
}

export type City = {
  name: string;
  country: string;
}
