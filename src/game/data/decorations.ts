import type { DecorationDef } from '../types';

export const DECORATIONS: DecorationDef[] = [
  { id: 'bench', name: 'Bench', emoji: '🪑', cost: 30, appeal: 2, unlockRP: 0, description: 'Tired visitors stay longer.' },
  { id: 'tree', name: 'Tree', emoji: '🌳', cost: 40, appeal: 3, unlockRP: 0, description: 'Shade and scenery.' },
  { id: 'flowers', name: 'Flower Bed', emoji: '🌷', cost: 50, appeal: 3, unlockRP: 0, description: 'A splash of color.' },
  { id: 'fountain', name: 'Fountain', emoji: '⛲', cost: 150, appeal: 8, unlockRP: 8, description: 'A relaxing centerpiece.' },
  { id: 'statue', name: 'Statue', emoji: '🗿', cost: 200, appeal: 9, unlockRP: 18, description: 'A grand monument.' },
  { id: 'lantern', name: 'Lantern', emoji: '🏮', cost: 90, appeal: 5, unlockRP: 5, description: 'Lights up the path.' },
  { id: 'foodstall', name: 'Food Stall', emoji: '🍿', cost: 180, appeal: 6, unlockRP: 14, description: 'Snacks keep visitors happy.' },
  { id: 'giftshop', name: 'Gift Shop', emoji: '🎁', cost: 320, appeal: 10, unlockRP: 30, description: 'Souvenirs visitors love.' },
];

export const DECORATIONS_MAP: Record<string, DecorationDef> = Object.fromEntries(
  DECORATIONS.map((d) => [d.id, d]),
);
