'use client';
export type EngineType = 'V12' | 'V8' | 'Hybrid' | 'W12' | 'Flat-6' | 'Supercharged V8' | 'W16';

export type CarStatus = 'In Stock' | 'Arriving Soon' | 'Reserved' | 'Bespoke Order' | 'Vault Exclusive';

export type SoundType = 'v12-naturally-aspirated' | 'v8-twin-turbo' | 'flat-6-high-rev' | 'v8-supercharged' | 'v10-naturally-aspirated' | 'w16-quad-turbo';

export interface CarSpec {
  engine: string;
  engineType: EngineType;
  horsepower: number;
  torque: string;
  acceleration: string;
  topSpeed: string;
  transmission: string;
  drivetrain: string;
  vin: string;
  interiorPackage: string;
  exteriorColor: string;
  customsStatus: string;
}

export interface SoundProfile {
  type: SoundType;
  idleRpm: number;
  redlineRpm: number;
  soundLabel: string;
  basePitch: number;
}

export interface GalleryItem {
  type: string;
  url: string;
}

export interface TurntableHotspot {
  id: string;
  label: string;
  angle: number;
  detail: string;
  topPercent: number;
  leftPercent: number;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  priceUSD: number;
  priceNGN: number;
  isPrivatePricing: boolean;
  isVaultExclusive?: boolean;
  image: string;
  interiorImage?: string;
  gallery?: GalleryItem[];
  status: CarStatus;
  bodyStyle: 'Coupe' | 'SUV' | 'Sedan' | 'Convertible' | 'Armored';
  soundProfile: SoundProfile;
  specs: CarSpec;
  overview: string;
  keyFeatures: string[];
  turntableColor?: string;
  hotspots?: TurntableHotspot[];
  frames360?: string[];
}

export type Currency = 'NGN' | 'USD';

export type PageView = 'home' | 'inventory' | 'bespoke' | 'about' | 'contact';
