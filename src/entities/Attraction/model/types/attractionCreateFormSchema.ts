import { Coordinates } from '@/shared/libs/types/coordinates';
import { Status } from '@/shared/libs/types/status';

export interface AttractionEditFormSchema {
  title: string;
  dateAdded: string;
  timeAdded: string;
  rating: number;
  photo: string;
  location: string;
  coordinates: Coordinates;
  mapLink: string;
  status: Status;
}
