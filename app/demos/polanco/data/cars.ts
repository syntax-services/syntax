'use client';
import { Car } from '../types/car';
import carsJson from './cars.json';

export const POLANCO_INFO = {
  name: 'Polanco Exotic Cars',
  tagline: 'Nigeria’s Premier Luxury & Hypercar Showroom',
  address: 'Plot 2, Km 33 Lekki-Epe Expressway, Lekki Phase 1, Lagos, Nigeria',
  phones: ['+234 810 651 5846', '+234 911 564 8723'],
  email: 'polancoexoticcars@gmail.com',
  hours: {
    weekdays: 'Monday – Friday: 8:00 AM – 7:00 PM',
    saturday: 'Saturday: 9:00 AM – 6:00 PM',
    sunday: 'Sunday: Private VIP Appointments Only'
  }
};

export const CARS_DATA: Car[] = carsJson as Car[];
