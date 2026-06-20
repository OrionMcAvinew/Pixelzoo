import type { SpeciesDef } from '../types';

export const SPECIES: SpeciesDef[] = [
  { id: 'rabbit', name: 'Rabbit', emoji: '🐰', cost: 50, upkeep: 2, appeal: 3, unlockRP: 0, description: 'A timid starter critter. Cheap and cheerful.' },
  { id: 'turtle', name: 'Turtle', emoji: '🐢', cost: 80, upkeep: 3, appeal: 4, unlockRP: 0, description: 'Slow, steady, and low-maintenance.' },
  { id: 'flamingo', name: 'Flamingo', emoji: '🦩', cost: 120, upkeep: 4, appeal: 6, unlockRP: 0, description: 'Bright pink visitors love to photograph it.' },
  { id: 'monkey', name: 'Monkey', emoji: '🐵', cost: 150, upkeep: 5, appeal: 7, unlockRP: 5, description: 'Playful and mischievous, draws a crowd.' },
  { id: 'zebra', name: 'Zebra', emoji: '🦓', cost: 200, upkeep: 6, appeal: 8, unlockRP: 10, description: 'Striped and striking.' },
  { id: 'penguin', name: 'Penguin', emoji: '🐧', cost: 220, upkeep: 6, appeal: 9, unlockRP: 12, description: 'A waddling crowd favorite.' },
  { id: 'kangaroo', name: 'Kangaroo', emoji: '🦘', cost: 260, upkeep: 7, appeal: 9, unlockRP: 15, description: 'Bouncy and full of energy.' },
  { id: 'giraffe', name: 'Giraffe', emoji: '🦒', cost: 300, upkeep: 8, appeal: 11, unlockRP: 20, description: 'Towers over the zoo, always a highlight.' },
  { id: 'gorilla', name: 'Gorilla', emoji: '🦍', cost: 350, upkeep: 9, appeal: 12, unlockRP: 28, description: 'Powerful and impressive.' },
  { id: 'panda', name: 'Panda', emoji: '🐼', cost: 400, upkeep: 10, appeal: 14, unlockRP: 36, description: 'The ultimate crowd-pleaser.' },
  { id: 'tiger', name: 'Tiger', emoji: '🐯', cost: 500, upkeep: 12, appeal: 16, unlockRP: 48, description: 'A fierce striped predator.' },
  { id: 'rhino', name: 'Rhino', emoji: '🦏', cost: 560, upkeep: 13, appeal: 17, unlockRP: 56, description: 'Armored and awe-inspiring.' },
  { id: 'elephant', name: 'Elephant', emoji: '🐘', cost: 600, upkeep: 14, appeal: 18, unlockRP: 64, description: 'Gentle giant, the heart of any zoo.' },
  { id: 'lion', name: 'Lion', emoji: '🦁', cost: 700, upkeep: 16, appeal: 20, unlockRP: 80, description: 'The king of your zoo.' },
];

export const SPECIES_MAP: Record<string, SpeciesDef> = Object.fromEntries(
  SPECIES.map((s) => [s.id, s]),
);
