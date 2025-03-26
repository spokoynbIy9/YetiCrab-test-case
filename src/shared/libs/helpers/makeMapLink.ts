import { Coordinates } from '../types/coordinates';

export const makeMapLink = (coordinates: Coordinates) =>
  `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`;
