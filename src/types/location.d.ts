export interface Location {
  id: number;
  address: string;
  name: string;
  description: string;
  category: string;
  price: number;
  createdAt: null;
  updatedAt: null;
  expireAt: string;
  city: string;
  lat: string;
  longM: string;
  averageRating: number;
}

export interface Image {
  id: number;
  image: string;
  event: Event;
}

export interface Event {
  id: number;
  address: string;
  name: string;
  description: string;
  category: string;
  price: number;
  createdAt: null;
  updatedAt: null;
  expireAt: string;
  city: string;
  lat: string;
  longM: string;
  averageRating: number;
}
