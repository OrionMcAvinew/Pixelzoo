import type { StaffDef, StaffType } from '../types';

export const STAFF_DEFS: Record<StaffType, StaffDef> = {
  keeper: {
    type: 'keeper',
    name: 'Keeper',
    emoji: '🧑‍🌾',
    wage: 20,
    hireCost: 100,
    description: 'Tends animals, slowing happiness decay and healing sick animals.',
  },
  vendor: {
    type: 'vendor',
    name: 'Vendor',
    emoji: '🧑‍🍳',
    wage: 15,
    hireCost: 80,
    description: 'Sells snacks and souvenirs, boosting income per visitor.',
  },
  scientist: {
    type: 'scientist',
    name: 'Scientist',
    emoji: '🧑‍🔬',
    wage: 25,
    hireCost: 150,
    description: 'Researches new species and attractions, generating RP.',
  },
};
